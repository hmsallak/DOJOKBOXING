"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, TRIAL_CTA } from "@/lib/nav";
import { ButtonLink } from "@/components/ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="display text-2xl md:text-3xl" onClick={() => setOpen(false)}>
          MBT<span className="text-accent">.</span>Academy
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className="py-3 text-sm font-semibold uppercase tracking-wider text-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href="/essai">{TRIAL_CTA}</ButtonLink>
          </div>
          <button
            type="button"
            className="flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-fg transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-fg transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navigation mobile"
          className="container-site fixed inset-x-0 bottom-0 top-16 flex flex-col gap-2 overflow-y-auto bg-bg py-8 md:top-20 lg:hidden"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 40}ms` }}
              className="display animate-rise border-b border-line py-4 text-4xl"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/essai" onClick={() => setOpen(false)} className="mt-6">
            {TRIAL_CTA}
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
