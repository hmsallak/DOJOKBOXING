import type { Metadata } from "next";
import { club, plans } from "@/data/club";
import { PageHeader, SectionTitle } from "@/components/ui";
import { Reassurance } from "@/components/Reassurance";
import { Faq, PlanCard } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Tarifs — cours de boxe à ${club.city}`,
  description: `Tarifs des cours de boxe à ${club.city} : mensuel et annuel. Séance d'essai ${club.trialFree ? "offerte" : "disponible"}, sans engagement.`,
  alternates: { canonical: "/tarifs" },
};

// TODO: conditions réelles (certificat médical, licence, paiement en plusieurs fois…)
const PRICING_FAQ = [
  { q: "Y a-t-il des frais d'inscription ?", a: "[À compléter : licence fédérale, assurance, frais de dossier]" },
  { q: "Faut-il un certificat médical ?", a: "[À compléter selon la politique du club et la réglementation]" },
  { q: "Peut-on payer en plusieurs fois ?", a: "[À compléter]" },
];

export default function TarifsPage() {
  return (
    <>
      <PageHeader eyebrow="Tarifs" title="Simple et sans surprise" intro="Commence par une séance d'essai, choisis ta formule ensuite." />
      <section className="container-site pb-20">
        {/* Mobile : la formule mise en avant passe en premier */}
        <div className="grid gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={p.highlighted ? "-order-1 sm:order-none" : ""}>
              <PlanCard p={p} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Reassurance items={["Essai offert avant tout paiement", "Aucune carte bancaire demandée pour l'essai", "Tu choisis ta formule après avoir essayé"]} />
        </div>
      </section>
      <section className="container-site border-t border-line py-20">
        <SectionTitle>Bon à savoir</SectionTitle>
        <div className="mt-10">
          <Faq items={PRICING_FAQ} />
        </div>
      </section>
    </>
  );
}
