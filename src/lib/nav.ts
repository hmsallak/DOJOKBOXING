import { club } from "@/data/club";

export const NAV = [
  { href: "/cours", label: "Cours" },
  { href: "/planning", label: "Planning" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/coachs", label: "Coachs" },
  { href: "/contact", label: "Contact" },
] as const;

export const TRIAL_CTA = club.trialFree ? "Réserver mon essai gratuit" : "Réserver mon essai";

export const whatsappUrl = (text = `Bonjour ${club.name}, j'aimerais des infos sur les cours.`) =>
  club.whatsapp ? `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}` : null;
