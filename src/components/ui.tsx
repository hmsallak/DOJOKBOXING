import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "px-6 bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "px-6 border border-fg/80 text-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg underline-offset-4 hover:underline",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Badge({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wider ${
        accent ? "bg-accent text-on-accent" : "border border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <header className="container-site pb-10 pt-16 md:pb-14 md:pt-24">
      {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-ink">{eyebrow}</p>}
      <h1 className="display animate-rise-soft text-5xl md:text-6xl lg:text-7xl">{title}</h1>
      {intro && <div className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{intro}</div>}
    </header>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`display text-4xl md:text-6xl ${className}`}>{children}</h2>;
}
