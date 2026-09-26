import type { Metadata } from "next";
import { club, classTypes } from "@/data/club";
import { PageHeader } from "@/components/ui";
import { ClassCard, CtaBand } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Cours de boxe à ${club.city}`,
  description: `Cours de boxe tous niveaux dès 15 ans à ${club.city} : lundi et mercredi 19h30, sparring le samedi 13h. Séance d'essai.`,
  alternates: { canonical: "/cours" },
};

const GROUPS = [
  { id: "adultes", title: "Dès 15 ans", filter: (a: string) => a === "adultes" || a === "femmes" },
  { id: "jeunes", title: "Moins de 15 ans", filter: (a: string) => a === "enfants" || a === "ados" },
];

export default function CoursPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cours"
        title="Les cours"
        intro="Un cours tous niveaux deux soirs par semaine, et du sparring encadré le samedi pour ceux qui ont les bases."
      />
      {GROUPS.map((g) => {
        const items = classTypes.filter((c) => g.filter(c.audience));
        if (!items.length) return null;
        return (
          <section key={g.id} id={g.id} className="container-site scroll-mt-24 pb-20">
            <h2 className="display mb-8 border-t border-line pt-10 text-4xl md:text-5xl">{g.title}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((c) => (
                <ClassCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        );
      })}
      <CtaBand />
    </>
  );
}
