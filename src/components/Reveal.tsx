"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Fait apparaître les enfants directs en cascade quand le bloc entre dans l'écran. */
export function Reveal({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ol" }) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!el) return;
    Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    const show = () => el.classList.add("is-visible");
    // Filet de sécurité : déjà à l'écran au chargement, ou navigateur sans IntersectionObserver.
    if (!("IntersectionObserver" in window) || el.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el]);

  return as === "ol" ? (
    <ol ref={setEl} data-reveal className={className}>
      {children}
    </ol>
  ) : (
    <div ref={setEl} data-reveal className={className}>
      {children}
    </div>
  );
}
