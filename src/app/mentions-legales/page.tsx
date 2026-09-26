import type { Metadata } from "next";
import { club } from "@/data/club";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

// TODO: compléter avec les informations légales réelles de l'association / société
export default function MentionsLegales() {
  return (
    <>
      <PageHeader title="Mentions légales" />
      <div className="container-site">
        <div className="max-w-3xl space-y-6 pb-24 text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg">
          <h2>Éditeur</h2>
          <p>
            {club.name} — [forme juridique : ASBL / SRL…],
            [adresse du siège], [numéro d&apos;entreprise BCE]. Directeur de la publication :
            [nom].
          </p>
          <h2>Hébergement</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, photos et logos de ce site appartiennent à {club.name},
            sauf mention contraire.
          </p>
        </div>
      </div>
    </>
  );
}
