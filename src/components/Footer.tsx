import Link from "next/link";
import { club } from "@/data/club";
import { NAV } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line bg-sunken">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="display text-3xl">
            MBT<span className="text-accent">.</span>Academy
          </p>
          <p className="mt-3 text-sm text-muted">
            {club.tagline} à {club.city}
          </p>
        </div>

        <address className="space-y-1 text-sm not-italic text-muted">
          <p className="mb-3 font-semibold uppercase tracking-wider text-fg">Le club</p>
          <p>{club.address}</p>
          <p>{club.access}</p>
          {club.phone && (
            <p>
              <a href={`tel:${club.phone}`} className="inline-flex min-h-11 items-center hover:text-fg">
                {club.phone}
              </a>
            </p>
          )}
          {club.email && (
            <p>
              <a href={`mailto:${club.email}`} className="inline-flex min-h-11 items-center hover:text-fg">
                {club.email}
              </a>
            </p>
          )}
        </address>

        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-2 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-11 items-center text-muted hover:text-fg">
              {item.label}
            </Link>
          ))}
          <Link href="/essai" className="flex min-h-11 items-center text-muted hover:text-fg">
            Séance d&apos;essai
          </Link>
          {club.instagram && (
            <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-muted hover:text-fg">
              Instagram
            </a>
          )}
        </nav>
      </div>
      <div className="container-site flex flex-wrap items-center gap-x-6 border-t border-line py-3 text-xs text-muted">
        <p>© {new Date().getFullYear()} {club.name}</p>
        <Link href="/mentions-legales" className="inline-flex min-h-11 items-center hover:text-fg">
          Mentions légales
        </Link>
        <Link href="/confidentialite" className="inline-flex min-h-11 items-center hover:text-fg">
          Confidentialité
        </Link>
      </div>
    </footer>
  );
}
