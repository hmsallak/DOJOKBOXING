import Image from "next/image";
import Link from "next/link";
import {
  AUDIENCE_LABELS,
  LEVEL_LABELS,
  classBySlug,
  type ClassType,
  type Coach,
  type Plan,
  type Session,
} from "@/data/club";
import { Badge, ButtonLink } from "@/components/ui";

export { classBySlug };

export function ClassCard({ c }: { c: ClassType }) {
  return (
    <article className="group flex flex-col border border-line bg-raised p-6 transition-colors hover:border-fg/40 md:p-8">
      <div className="flex flex-wrap gap-2">
        {c.comingSoon && <Badge accent>Bientôt</Badge>}
        <Badge>{c.ageRange ?? AUDIENCE_LABELS[c.audience]}</Badge>
        <Badge>{LEVEL_LABELS[c.level]}</Badge>
      </div>
      <h3 className="display mt-6 text-3xl md:text-4xl">{c.name}</h3>
      {!c.comingSoon && <p className="mt-2 text-sm text-muted">{c.durationMin} min</p>}
      <p className="mt-4 flex-1 text-fg/85">{c.summary}</p>
      <div className="mt-6 flex flex-wrap gap-4">
        {c.comingSoon ? (
          <ButtonLink href="/contact" variant="secondary">
            Être prévenu
          </ButtonLink>
        ) : (
          <>
            {c.trial ? (
              <ButtonLink href={`/essai?cours=${c.slug}`}>Essayer ce cours</ButtonLink>
            ) : (
              <ButtonLink href="/essai" variant="secondary">
                Commencer par un cours
              </ButtonLink>
            )}
            <ButtonLink href={`/planning?cours=${c.slug}`} variant="ghost">
              Horaires
            </ButtonLink>
          </>
        )}
      </div>
    </article>
  );
}

export function SessionRow({ s }: { s: Session }) {
  const c = classBySlug(s.classSlug);
  if (!c) return null;
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-4 last:border-0">
      <div>
        <p className="font-semibold">{c.name}</p>
        <p className="text-sm text-muted">
          <time>{s.start}</time> – <time>{s.end}</time> · {LEVEL_LABELS[c.level]}
          {s.coach && ` · ${s.coach}`}
        </p>
      </div>
      {c.trial ? (
        <Link
          href={`/essai?creneau=${s.id}`}
          className="flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold uppercase tracking-wider text-accent-ink hover:underline"
          aria-label={`Essayer ${c.name} le ${s.day} à ${s.start}`}
        >
          Essayer
        </Link>
      ) : (
        <span className="shrink-0 text-xs uppercase tracking-wider text-muted">Confirmés</span>
      )}
    </li>
  );
}

export function PlanCard({ p }: { p: Plan }) {
  return (
    <article
      className={`relative flex flex-col p-6 md:p-8 ${
        p.highlighted ? "border-2 border-accent bg-raised" : "border border-line"
      }`}
    >
      {p.highlighted && (
        <div className="absolute -top-3 left-6">
          <Badge accent>Le plus choisi</Badge>
        </div>
      )}
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">{p.name}</h2>
      <p className="mt-4">
        <span className="display text-5xl">{p.price}</span>
        <span className="ml-1 text-muted">{p.period}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {p.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="/essai" variant={p.highlighted ? "primary" : "secondary"} className="mt-8">
        {p.id === "essai" ? "Réserver" : "Commencer par un essai"}
      </ButtonLink>
    </article>
  );
}

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="group border border-line">
      <div className="relative aspect-[3/4] overflow-hidden bg-raised">
        {coach.photo ? (
          <Image
            src={coach.photo}
            alt={`${coach.name}, ${coach.role.toLowerCase()} de MBT Academy`}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted">Photo à venir</div>
        )}
      </div>
      <div className="p-6">
        <h2 className="display text-3xl">{coach.name}</h2>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent-ink">{coach.role}</p>
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {coach.credentials.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="mt-4 text-fg/85">{coach.bio}</p>
      </div>
    </article>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden className="text-2xl text-accent transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Ta première séance t'attend", text }: { title?: string; text?: string }) {
  return (
    <section className="bg-accent text-on-accent">
      <div className="container-site flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <h2 className="display text-4xl md:text-6xl">{title}</h2>
          {text && <p className="mt-3 max-w-xl text-lg">{text}</p>}
        </div>
        <Link
          href="/essai"
          className="inline-flex min-h-12 shrink-0 items-center rounded-sm bg-bg px-8 text-sm font-semibold uppercase tracking-wider text-fg transition-colors hover:bg-sunken"
        >
          Réserver maintenant
        </Link>
      </div>
    </section>
  );
}
