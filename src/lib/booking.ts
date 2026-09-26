import { z } from "zod";
import { DAYS, club, trialSessions, type Session } from "@/data/club";

export const TZ = "Europe/Paris";
const WEEKS_AHEAD = 3;

/** Date du jour à Paris, "YYYY-MM-DD". */
function todayInParis(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
}

/** Prochaines dates (à partir de demain) où le créneau a lieu. */
export function upcomingDates(session: Session, now = new Date()) {
  const jsDay = (DAYS.indexOf(session.day) + 1) % 7; // lundi = 1 … dimanche = 0
  const d = new Date(`${todayInParis(now)}T12:00:00Z`);
  const out: { value: string; label: string }[] = [];
  // TODO: exclure les fermetures / jours fériés quand la liste sera connue
  for (let i = 1; out.length < WEEKS_AHEAD && i <= 7 * WEEKS_AHEAD + 7; i++) {
    const cur = new Date(d);
    cur.setUTCDate(d.getUTCDate() + i);
    if (cur.getUTCDay() !== jsDay) continue;
    out.push({
      value: cur.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(cur),
    });
  }
  return out;
}

export const findSession = (id: string) => trialSessions().find((s) => s.id === id);

export const trialSchema = z
  .object({
    sessionId: z.string({ message: "Choisis un créneau." }).refine((id) => !!findSession(id), "Choisis un créneau."),
    date: z.string({ message: "Choisis une date." }).min(1, "Choisis une date."),
    firstName: z.string().trim().min(1, "Indique ton prénom.").max(60),
    lastName: z.string().trim().min(1, "Indique ton nom.").max(60),
    email: z.string().trim().email("Cet email ne semble pas valide."),
    phone: z
      .string()
      .trim()
      .refine((v) => v.replace(/\D/g, "").length >= 10, "Indique un numéro de téléphone complet."),
    age: z.preprocess(
      (v) => (v === "" || v == null ? undefined : Number(v)),
      z.number({ message: "Indique l'âge du pratiquant." }).int().min(club.minAge, `Les cours sont ouverts dès ${club.minAge} ans. Le cours jeunes arrive bientôt : écris-nous pour être prévenu.`).max(99, "Âge invalide."),
    ),
    parentName: z.string().trim().max(120).optional(),
    message: z.string().trim().max(1000).optional(),
    consent: z.literal("on", { message: "Ton accord est nécessaire pour qu'on te recontacte." }),
  })
  .superRefine((v, ctx) => {
    if (v.age < 18 && !v.parentName) {
      ctx.addIssue({ code: "custom", path: ["parentName"], message: "Nom du parent ou tuteur requis pour un mineur." });
    }
    const s = findSession(v.sessionId);
    if (s && !upcomingDates(s).some((d) => d.value === v.date)) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "Cette date n'est plus disponible, choisis-en une autre." });
    }
  });

export type TrialInput = z.infer<typeof trialSchema>;

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<string, string[]>>;
  values?: Record<string, string>;
};
