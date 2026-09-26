import type { Metadata } from "next";
import { LEVEL_LABELS, classBySlug, club, trialSessions } from "@/data/club";
import { upcomingDates } from "@/lib/booking";
import { PageHeader } from "@/components/ui";
import { Reassurance } from "@/components/Reassurance";
import { whatsappUrl } from "@/lib/nav";
import { TrialForm, type SessionOption } from "./TrialForm";

export const metadata: Metadata = {
  title: `Séance d'essai ${club.trialFree ? "gratuite" : ""} — boxe à ${club.city}`,
  description: `Réserve ta séance d'essai de boxe à ${club.city} en une minute. Gants prêtés, sans engagement.`,
  alternates: { canonical: "/essai" },
};

export default async function EssaiPage({ searchParams }: PageProps<"/essai">) {
  const { creneau, cours } = await searchParams;

  const options: SessionOption[] = trialSessions().flatMap((s) => {
    const c = classBySlug(s.classSlug);
    if (!c) return [];
    return [
      {
        id: s.id,
        name: c.name,
        day: s.day,
        time: `${s.start}–${s.end}`,
        meta: c.ageRange ?? LEVEL_LABELS[c.level],
        dates: upcomingDates(s),
      },
    ];
  });

  const preselected =
    (typeof creneau === "string" && options.find((o) => o.id === creneau)?.id) ||
    (typeof cours === "string" && trialSessions().find((s) => s.classSlug === cours)?.id) ||
    undefined;

  return (
    <>
      <PageHeader
        eyebrow={club.trialFree ? "Séance d'essai offerte" : "Séance d'essai"}
        title="Réserve ton essai"
        intro={`Trois étapes, une minute. Dès ${club.minAge} ans. Les gants sont prêtés, viens simplement en tenue de sport.`}
      />
      <div className="container-site grid gap-12 pb-24 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <div className="mb-10 lg:hidden">
            <Reassurance />
          </div>
          <TrialForm key={preselected} options={options} preselected={preselected} />
        </div>

        {/* Contre-objections au point de friction : ce qui se passe après l'envoi. */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-line bg-raised p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Après ta réservation</h2>
            <ol className="mt-5 space-y-5 text-sm">
              <li>
                <p className="font-semibold">On te confirme ta place</p>
                <p className="mt-1 text-muted">Par email ou téléphone, avec l&apos;adresse et quoi apporter.</p>
              </li>
              <li>
                <p className="font-semibold">Tu viens en tenue de sport</p>
                <p className="mt-1 text-muted">Gants prêtés. Arrive 10 minutes avant.</p>
              </li>
              <li>
                <p className="font-semibold">Tu décides ensuite</p>
                <p className="mt-1 text-muted">Aucun paiement, aucun engagement pour l&apos;essai.</p>
              </li>
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
              Un empêchement ?{" "}
              {whatsappUrl() ? (
                <a href={whatsappUrl("Bonjour, je dois décaler ma séance d'essai.")!} className="font-semibold text-fg underline underline-offset-4">
                  Préviens-nous sur WhatsApp
                </a>
              ) : (
                "Préviens-nous, on décale sans problème."
              )}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
