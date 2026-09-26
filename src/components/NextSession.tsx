"use client";

import { useSyncExternalStore } from "react";
import { DAYS, trialSessions } from "@/data/club";

const noop = () => () => {};

/** Prochain créneau réel d'un niveau donné, heure de Paris. Rendu côté client uniquement (page statique). */
function nextLabel() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  const today = DAYS.indexOf(parts.weekday as (typeof DAYS)[number]);
  const now = `${parts.hour}:${parts.minute}`;
  const candidates = trialSessions()
    .map((s) => {
      let diff = (DAYS.indexOf(s.day) - today + 7) % 7;
      if (diff === 0 && s.start <= now) diff = 7;
      return { s, diff };
    })
    .sort((a, b) => a.diff - b.diff || a.s.start.localeCompare(b.s.start));
  const next = candidates[0];
  if (!next) return null;
  const when = next.diff === 0 ? "aujourd'hui" : next.diff === 1 ? "demain" : next.s.day;
  return `${when} à ${next.s.start.replace(":", "h")}`;
}

export function NextSession({ label = "Prochain cours" }: { label?: string }) {
  const text = useSyncExternalStore(noop, nextLabel, () => null);
  if (!text) return null;
  return (
    <p className="flex items-center gap-2 text-sm text-muted">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {label} : <span className="font-semibold text-fg">{text}</span>
    </p>
  );
}
