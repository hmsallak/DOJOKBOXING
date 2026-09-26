const WORDS = ["Jab", "Cross", "Crochet", "Uppercut", "Esquive", "Garde", "Remise", "Contre"];

/** Bandeau défilant en CSS pur (aucun JS, stoppé par prefers-reduced-motion). */
export function Marquee() {
  const row = WORDS.flatMap((w) => [w, "·"]);
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-sunken py-5 select-none">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={`display text-4xl md:text-6xl ${w === "·" ? "text-accent" : "text-fg/40"}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
