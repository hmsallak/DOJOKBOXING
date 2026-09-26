import type { Metadata } from "next";
import Link from "next/link";
import { DAYS, classTypes, club, schedule } from "@/data/club";
import { PageHeader } from "@/components/ui";
import { CtaBand, SessionRow } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Planning des cours de boxe — ${club.city}`,
  description: `Horaires des cours de boxe à ${club.city} : lundi et mercredi 19h30–20h30, sparring le samedi 13h–14h30. Réserve ta séance d'essai sur le créneau de ton choix.`,
  alternates: { canonical: "/planning" },
};

const FILTERS: { value?: string; label: string }[] = [
  { label: "Tous" },
  ...classTypes.filter((c) => !c.comingSoon && schedule.some((s) => s.classSlug === c.slug)).map((c) => ({ value: c.slug, label: c.name })),
];

export default async function PlanningPage({ searchParams }: PageProps<"/planning">) {
  const { cours: raw } = await searchParams;
  const active = FILTERS.find((f) => f.value === raw)?.value;
  const sessions = schedule.filter((s) => !active || s.classSlug === active);
  const days = DAYS.map((day) => ({ day, items: sessions.filter((s) => s.day === day) })).filter((d) => d.items.length);

  return (
    <>
      <PageHeader eyebrow="Planning" title="Les horaires" intro="Clique sur « Essayer » pour réserver ta séance d'essai sur ce créneau. Cours jeunes (moins de 15 ans) : bientôt." />

      <div className="container-site pb-20">
        <nav aria-label="Filtrer par cours" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {FILTERS.map((f) => {
            const isActive = f.value === active;
            return (
              <Link
                key={f.label}
                href={f.value ? `/planning?cours=${f.value}` : "/planning"}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-11 shrink-0 items-center rounded-sm border px-5 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg/50 hover:text-fg"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </nav>

        {days.length ? (
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {days.map(({ day, items }) => (
              <section key={day}>
                <h2 className="display border-b-2 border-accent pb-3 text-3xl capitalize">{day}</h2>
                <ul>
                  {items.map((s) => (
                    <SessionRow key={s.id} s={s} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted">Aucun cours pour ce filtre pour le moment.</p>
        )}

        <p className="mt-12 text-sm text-muted">
          {/* TODO: périodes de fermeture */}
          Planning valable hors vacances scolaires et jours fériés.
        </p>
      </div>
      <CtaBand />
    </>
  );
}
