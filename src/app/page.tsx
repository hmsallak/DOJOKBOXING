import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { club, classTypes, coaches, faq } from "@/data/club";
import { TRIAL_CTA } from "@/lib/nav";
import { ButtonLink, SectionTitle } from "@/components/ui";
import { ClassCard, CoachCard, CtaBand, Faq } from "@/components/blocks";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Reassurance } from "@/components/Reassurance";
import { NextSession } from "@/components/NextSession";

const AUDIENCES = [
  {
    title: "Tu n'as jamais boxé",
    text: "Le coach adapte le cours à ton niveau : garde, déplacements, premiers enchaînements. Personne ne te met en opposition dure.",
    href: "/cours#adultes",
    main: true,
  },
  { title: "Tu veux mettre les gants", text: "Sparring encadré le samedi de 13h à 14h30, pour ceux qui ont les bases. Jamais imposé.", href: "/cours#adultes" },
  { title: "Moins de 15 ans", text: "Un cours jeunes arrive bientôt. Écris-nous pour être prévenu à l'ouverture.", href: "/cours#jeunes" },
];

const TRIAL_STEPS = [
  { n: "01", title: "Réserve en ligne", text: "Choisis ton cours et ton créneau. Une minute." },
  { n: "02", title: "Arrive 10 min avant", text: "Tenue de sport et eau. Les gants sont prêtés." },
  { n: "03", title: "Entraîne-toi", text: "Échauffement, technique, sac, retour au calme." },
  { n: "04", title: "Décide ensuite", text: "Aucun engagement. Le coach te conseille une formule." },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: club.name,
    address: { "@type": "PostalAddress", streetAddress: club.address, postalCode: club.postalCode, addressLocality: club.city, addressCountry: club.country },
    telephone: club.phone || undefined,
    sameAs: club.instagram ? [club.instagram] : undefined,
    ...(club.googleRating && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: club.googleRating.rating, reviewCount: club.googleRating.count },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* HERO — asymétrique : texte à gauche, photo à droite */}
      <section className="relative overflow-hidden">
        <div className="container-site grid gap-10 pb-16 pt-14 md:min-h-[calc(100dvh-5rem)] md:grid-cols-[1.15fr_0.85fr] md:items-center md:pb-20">
          <div>
            <p className="animate-rise mb-6 text-sm font-semibold uppercase tracking-widest text-accent-ink">
              {club.tagline} · {club.city}
            </p>
            <h1 className="display animate-rise-soft text-[clamp(3.25rem,10vw,8rem)]">
              Apprends
              <br />
              à boxer<span className="text-accent">.</span>
            </h1>
            <p className="animate-rise mt-6 max-w-[46ch] text-lg leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
              Lundi et mercredi à 19h30, dès 15 ans, tous niveaux : le coach adapte le travail à chacun. Sparring encadré le samedi pour ceux qui ont les bases.
            </p>
            <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
              <ButtonLink href="/essai">
                {TRIAL_CTA}
                <ArrowRightIcon weight="bold" className="size-4" />
              </ButtonLink>
              <ButtonLink href="/planning" variant="secondary">
                Voir le planning
              </ButtonLink>
            </div>
            <div className="animate-rise mt-6 space-y-3" style={{ "--i": 4 } as React.CSSProperties}>
              <Reassurance />
              <NextSession />
              {club.googleRating && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <StarIcon weight="fill" className="size-4 text-accent-ink" />
                  {club.googleRating.rating}/5 · {club.googleRating.count} avis Google
                </p>
              )}
            </div>
          </div>

          {/* TODO: remplacer par <Image> d'une vraie photo N&B du club (priority, sizes) */}
          <div
            className="animate-rise relative hidden aspect-[4/5] overflow-hidden border border-line bg-raised md:block"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.04) 14px 15px)" }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            <p className="display absolute bottom-6 left-6 right-6 text-7xl text-fg/10 lg:text-8xl">MBT</p>
            <p className="absolute left-6 top-6 text-xs uppercase tracking-widest text-muted">Photo du club à fournir</p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* POUR QUI — grille asymétrique : le public principal prend la grande case */}
      <section id="pour-qui" className="container-site scroll-mt-20 py-24 md:py-32">
        <SectionTitle>Pour qui ?</SectionTitle>
        <Reveal className="mt-12 grid gap-3 md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
          {AUDIENCES.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className={`group flex flex-col justify-between gap-10 border border-line bg-bg p-6 transition-colors duration-300 ease-out hover:border-fg/30 hover:bg-raised md:p-10 ${
                a.main ? "md:row-span-2" : ""
              }`}
            >
              <div>
                <h3 className={`display ${a.main ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"}`}>{a.title}</h3>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">{a.text}</p>
              </div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-ink">
                Voir les cours
                <ArrowRightIcon weight="bold" className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* DÉROULÉ ESSAI — section claire pour casser le rythme */}
      <section id="deroule" className="scroll-mt-20 bg-light text-on-light">
        <div className="container-site grid gap-12 py-24 md:grid-cols-[0.8fr_1.2fr] md:py-32">
          <div>
            <SectionTitle>Ta séance d&apos;essai</SectionTitle>
            <p className="mt-6 max-w-[40ch] leading-relaxed text-on-light/70">
              Tu n&apos;as besoin de rien savoir. Voilà exactement comment ça se passe.
            </p>
          </div>
          <Reveal as="ol" className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {TRIAL_STEPS.map((s) => (
              <li key={s.n} className="border-t-2 border-on-light pt-5">
                <p className="display text-5xl text-accent-ink-light">{s.n}</p>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-on-light/70">{s.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COURS */}
      <section id="cours" className="container-site scroll-mt-20 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>Les cours</SectionTitle>
          <ButtonLink href="/cours" variant="ghost">
            Tous les cours <ArrowRightIcon weight="bold" className="size-4" />
          </ButtonLink>
        </div>
        <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
          {classTypes.map((c) => (
            <ClassCard key={c.slug} c={c} />
          ))}
        </Reveal>
      </section>

      {/* COACHS */}
      <section id="coachs" className="scroll-mt-20 border-t border-line">
        <div className="container-site grid gap-12 py-24 md:grid-cols-[1fr_1.3fr] md:py-32">
          <div>
            <SectionTitle>Les coachs</SectionTitle>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-muted">
              {/* TODO: remplacer par un fait vérifiable (diplômes, années d'expérience) */}
              Ceux qui t&apos;accueillent dès ta première séance et corrigent ta garde, coup après coup.
            </p>
            <ButtonLink href="/coachs" variant="ghost" className="mt-6">
              L&apos;équipe <ArrowRightIcon weight="bold" className="size-4" />
            </ButtonLink>
          </div>
          <Reveal className="grid gap-6 sm:grid-cols-2">
            {coaches.map((c) => (
              <CoachCard key={c.slug} coach={c} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ — titre collant à gauche */}
      <section id="faq" className="scroll-mt-20 border-t border-line">
        <div className="container-site grid gap-12 py-24 md:grid-cols-[0.8fr_1.2fr] md:py-32">
          <div>
            <div className="md:sticky md:top-32">
              <SectionTitle>Tes questions</SectionTitle>
            </div>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand text="Réserve ton créneau en une minute. Les gants sont prêtés." />
    </>
  );
}
