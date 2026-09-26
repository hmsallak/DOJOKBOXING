/**
 * Source unique de vérité pour les infos du club.
 * Tout ce qui est marqué TODO est provisoire : à remplacer par les vraies données.
 * Ne jamais inventer de palmarès, d'avis ou de chiffres.
 */

export type Level = "debutant" | "intermediaire" | "confirme" | "tous";
export type Audience = "adultes" | "enfants" | "ados" | "femmes";
export type Day = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";

export const DAYS: Day[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

export const LEVEL_LABELS: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  confirme: "Confirmé",
  tous: "Tous niveaux",
};

export const AUDIENCE_LABELS: Record<Audience, string> = {
  adultes: "Adultes",
  enfants: "Enfants",
  ados: "Ados",
  femmes: "Femmes",
};

export const club = {
  name: "MBT Academy",
  tagline: "Club de boxe", // TODO: discipline exacte (boxe anglaise ?)
  city: "Anderlecht",
  address: "Rue Poxcat 9",
  postalCode: "1070",
  country: "BE",
  phone: "", // TODO: format international, ex. "+32470123456"
  whatsapp: "", // TODO: numéro sans "+", ex. "32470123456"
  email: "", // TODO
  instagram: "", // TODO: URL complète
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rue+Poxcat+9+1070+Anderlecht", // TODO: lien de la fiche Google du club
  access: "", // TODO: métro / tram / parking
  minAge: 15, // cours enfants (moins de 15 ans) : bientôt
  trialFree: true, // TODO: confirmer que la séance d'essai est gratuite
  googleRating: null as null | { rating: number; count: number }, // TODO: ex. { rating: 4.9, count: 87 }
};

export type ClassType = {
  slug: string;
  name: string;
  level: Level;
  audience: Audience;
  ageRange?: string;
  durationMin: number;
  summary: string;
  trial: boolean; // réservable comme séance d'essai
  comingSoon?: boolean;
};

export const classTypes: ClassType[] = [
  {
    slug: "boxe",
    name: "Boxe",
    level: "tous",
    audience: "adultes",
    ageRange: "15 ans et +",
    durationMin: 60,
    // TODO: faire valider le contenu exact du cours par le coach
    summary: "Échauffement, technique, enchaînements au sac et aux pattes d'ours. Le coach adapte le travail à ton niveau, du premier cours à la compétition.",
    trial: true,
  },
  {
    slug: "sparring",
    name: "Sparring",
    level: "confirme",
    audience: "adultes",
    ageRange: "15 ans et +",
    durationMin: 90,
    summary: "Mises de gants encadrées pour les boxeurs qui ont déjà les bases. Jamais imposé : on y vient quand le coach et toi êtes prêts.",
    trial: false, // hypothèse : pas d'essai direct en sparring
  },
  {
    slug: "boxe-jeunes",
    name: "Boxe jeunes",
    level: "tous",
    audience: "enfants",
    ageRange: "Moins de 15 ans",
    durationMin: 60,
    summary: "Un cours pour les moins de 15 ans arrive bientôt. Laisse-nous tes coordonnées pour être prévenu à l'ouverture.",
    trial: false,
    comingSoon: true,
  },
];

export const classBySlug = (slug: string) => classTypes.find((c) => c.slug === slug);

export type Session = {
  id: string;
  classSlug: string;
  day: Day;
  start: string; // "19:30"
  end: string;
  coach?: string;
};

export const schedule: Session[] = [
  { id: "lun-1930-boxe", classSlug: "boxe", day: "lundi", start: "19:30", end: "20:30" },
  { id: "mer-1930-boxe", classSlug: "boxe", day: "mercredi", start: "19:30", end: "20:30" },
  { id: "sam-1300-sparring", classSlug: "sparring", day: "samedi", start: "13:00", end: "14:30" },
];

export const trialSessions = () => schedule.filter((s) => classBySlug(s.classSlug)?.trial);

export type Plan = {
  id: string;
  name: string;
  price: string; // affiché tel quel, ex. "45 €"
  period: string; // ex. "/ mois"
  features: string[];
  highlighted?: boolean;
};

// TODO: vrais tarifs
export const plans: Plan[] = [
  {
    id: "essai",
    name: "Séance d'essai",
    price: "Offerte",
    period: "",
    features: ["1 cours au choix (lundi ou mercredi)", "Gants prêtés", "Sans engagement"],
  },
  {
    id: "mensuel",
    name: "Mensuel",
    price: "[prix]",
    period: "/ mois",
    features: ["Cours du lundi et du mercredi", "Sparring du samedi (quand tu es prêt)", "Résiliable [conditions]"],
    highlighted: true,
  },
  {
    id: "annuel",
    name: "Annuel",
    price: "[prix]",
    period: "/ an",
    features: ["Tous les cours + sparring", "[avantage annuel]"],
  },
];

export type Coach = {
  slug: string;
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  photo?: string; // chemin dans /public
};

export const coaches: Coach[] = [
  {
    slug: "madiba-bayo-thomas",
    name: "Madiba Bayo Thomas",
    role: "Entraîneur principal", // TODO: fondateur ? (MBT = ses initiales)
    credentials: ["25 ans d'expérience en boxe"], // TODO: diplômes, palmarès vérifiables
    bio: "25 ans d'expérience au service des débutants comme des boxeurs confirmés.",
    photo: "/coachs/madiba-bayo-thomas.png",
  },
];

// FAQ ordonnée par objection (O/CO) — voir docs/cro-oco.md. Réponses = faits, jamais de promesse vague.
export const faq: { q: string; a: string }[] = [
  {
    q: "Je n'ai jamais boxé, je peux venir ?",
    a: "Oui. Le coach adapte le travail à chacun : un débutant commence par la garde, les déplacements et les coups de base, pendant que les plus avancés travaillent leurs enchaînements.",
  },
  {
    q: "Est-ce que je vais prendre des coups ?",
    a: "Pas lors de ta séance d'essai. Tu travailles au sac et aux pattes d'ours. Le sparring vient plus tard, uniquement si tu le souhaites, et toujours encadré.",
  },
  {
    q: "Je ne suis pas en forme, c'est un problème ?",
    a: "Non. Chacun va à son rythme et la condition physique vient en boxant. Préviens simplement le coach si tu as une blessure.",
  },
  {
    q: "Qu'est-ce que je dois apporter ?",
    a: "Une tenue de sport, des baskets propres et une bouteille d'eau. Les gants sont prêtés pour la séance d'essai.",
  },
  {
    q: "À partir de quel âge peut-on s'inscrire ?",
    a: "Dès 15 ans. Un cours pour les moins de 15 ans arrive bientôt : écris-nous pour être prévenu à l'ouverture. Pour les 15–17 ans, un parent doit valider l'inscription.",
  },
  {
    q: "Combien ça coûte après l'essai ?",
    a: "La séance d'essai est offerte et sans engagement. Ensuite, les formules sont détaillées sur la page Tarifs : tu choisis après avoir essayé.",
  },
  {
    q: "Je peux commencer en cours d'année ?",
    a: "Oui, on accueille des nouveaux toute l'année, le lundi et le mercredi à 19h30.",
  },
];
