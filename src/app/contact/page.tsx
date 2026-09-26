import type { Metadata } from "next";
import { club } from "@/data/club";
import { TRIAL_CTA, whatsappUrl } from "@/lib/nav";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact & accès",
  description: `Adresse, accès et contact de ${club.name} à ${club.city}. Écris-nous sur WhatsApp ou appelle-nous.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappUrl();
  return (
    <>
      <PageHeader eyebrow="Contact" title="Viens nous voir" intro="Le plus simple : réserve une séance d'essai. Pour toute autre question, on répond vite sur WhatsApp." />
      <div className="container-site grid gap-12 pb-24 md:grid-cols-2">
        <section className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Adresse</h2>
            <address className="mt-2 text-xl not-italic">
              {club.address}
              <br />
              {club.postalCode} {club.city}
            </address>
            <p className="mt-2 text-muted">{club.access}</p>
            {club.mapsUrl && (
              <a href={club.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline">
                Itinéraire Google Maps <ArrowUpRightIcon weight="bold" className="size-4" />
              </a>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {wa && (
              <ButtonLink href={wa} target="_blank" rel="noopener noreferrer" variant="secondary">
                WhatsApp
              </ButtonLink>
            )}
            {club.phone && (
              <ButtonLink href={`tel:${club.phone}`} variant="secondary">
                Appeler
              </ButtonLink>
            )}
            {club.email && (
              <ButtonLink href={`mailto:${club.email}`} variant="secondary">
                Email
              </ButtonLink>
            )}
          </div>
          {!wa && !club.phone && !club.email && (
            <p className="text-sm text-muted">[Coordonnées à compléter dans src/data/club.ts]</p>
          )}

          <ButtonLink href="/essai">{TRIAL_CTA}</ButtonLink>
        </section>

        {/* TODO: carte Google Maps (iframe lazy) une fois l'adresse connue */}
        <div className="flex aspect-square items-center justify-center border border-line bg-raised text-sm text-muted md:aspect-auto">
          Carte à venir
        </div>
      </div>
    </>
  );
}
