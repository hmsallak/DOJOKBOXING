import type { Metadata } from "next";
import { club } from "@/data/club";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

// TODO: faire valider (durées de conservation, sous-traitants réels, contact RGPD)
export default function Confidentialite() {
  return (
    <>
      <PageHeader title="Confidentialité" />
      <div className="container-site">
        <div className="max-w-3xl space-y-6 pb-24 text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg">
          <h2>Données collectées</h2>
          <p>
            Lors d&apos;une réservation de séance d&apos;essai : prénom, nom,
            email, téléphone, âge, nom du parent pour un mineur et message
            facultatif.
          </p>
          <h2>Utilisation</h2>
          <p>
            Uniquement pour organiser ta séance d&apos;essai et te recontacter à
            son sujet. Aucune revente, aucune prospection par des tiers.
          </p>
          <h2>Durée de conservation</h2>
          <p>
            [À définir, ex. 12 mois après la séance d&apos;essai si aucune
            inscription.]
          </p>
          <h2>Tes droits</h2>
          <p>
            Accès, rectification, suppression : écris à{" "}
            {club.email || "[email du club]"}. Tu peux aussi saisir l&apos;Autorité de protection des données
            (autoriteprotectiondonnees.be).
          </p>
        </div>
      </div>
    </>
  );
}
