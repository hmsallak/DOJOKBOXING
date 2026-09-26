import type { Metadata } from "next";
import { club, coaches } from "@/data/club";
import { PageHeader } from "@/components/ui";
import { CoachCard, CtaBand } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Les coachs",
  description: `L'équipe d'entraîneurs de ${club.name} à ${club.city} : diplômes, parcours et spécialités.`,
  alternates: { canonical: "/coachs" },
};

export default function CoachsPage() {
  return (
    <>
      <PageHeader eyebrow="L'équipe" title="Les coachs" intro="Ceux qui t'accueillent dès ta première séance." />
      <section className="container-site pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
          {coaches.map((c) => (
            <CoachCard key={c.slug} coach={c} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
