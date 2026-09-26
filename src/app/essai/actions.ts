"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { classBySlug } from "@/data/club";
import { findSession, trialSchema, type FormState } from "@/lib/booking";
import { supabaseAdmin } from "@/lib/supabase-server";

const MAX_PER_IP_PER_HOUR = 5;

export async function bookTrial(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => !k.startsWith("$ACTION") && typeof v === "string"),
  ) as Record<string, string>;

  // Honeypot : les robots remplissent ce champ invisible. On fait semblant d'accepter.
  if (raw.website) return { status: "success", message: "C'est noté !" };

  const parsed = trialSchema.safeParse({ ...raw, parentName: raw.parentName || undefined, message: raw.message || undefined });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  const d = parsed.data;
  const session = findSession(d.sessionId)!;
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
  const ipHash = ip ? createHash("sha256").update(ip + (process.env.IP_HASH_SALT ?? "")).digest("hex") : null;
  const retry = { status: "error" as const, values: raw };

  const db = supabaseAdmin();
  if (!db) {
    // Supabase pas encore configuré (.env.local) : on journalise pour ne rien perdre en dev.
    console.warn("[essai] Supabase non configuré — réservation non enregistrée :", d);
  } else {
    if (ipHash) {
      const since = new Date(Date.now() - 3600_000).toISOString();
      const { count } = await db
        .from("trial_bookings")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);
      if ((count ?? 0) >= MAX_PER_IP_PER_HOUR) {
        return { ...retry, message: "Trop de demandes depuis cette connexion. Réessaie dans une heure ou écris-nous." };
      }
    }

    const { error } = await db.from("trial_bookings").insert({
      session_id: d.sessionId,
      session_date: d.date,
      class_name: classBySlug(session.classSlug)?.name ?? session.classSlug,
      session_start: session.start,
      first_name: d.firstName,
      last_name: d.lastName,
      email: d.email.toLowerCase(),
      phone: d.phone,
      age: d.age,
      parent_name: d.parentName ?? null,
      message: d.message ?? null,
      source: h.get("referer") ?? null,
      ip_hash: ipHash,
      consent_at: new Date().toISOString(),
    });

    if (error?.code === "23505") {
      return { ...retry, message: "Tu es déjà inscrit(e) sur ce créneau. Choisis une autre date si besoin." };
    }
    if (error) {
      console.error("[essai] insert échoué", error);
      return { ...retry, message: "Impossible d'enregistrer ta réservation. Réessaie dans un instant ou écris-nous sur WhatsApp." };
    }
    // TODO: email de confirmation (Resend) + notification au club.
  }

  const date = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${d.date}T12:00:00Z`));
  return {
    status: "success",
    message: `C'est noté, ${d.firstName} ! On t'attend ${date} à ${session.start.replace(":", "h")}.`,
  };
}
