import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

// Contre-objections placées au point de friction (juste sous le CTA).
// TODO: n'afficher que ce qui est vrai pour le club.
const DEFAULT_ITEMS = ["Gants prêtés", "Aucun sparring imposé", "Sans engagement"];

export function Reassurance({ items = DEFAULT_ITEMS, tone = "dark" }: { items?: string[]; tone?: "dark" | "light" }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm ${tone === "dark" ? "text-muted" : "text-on-light/70"}`}>
      {items.map((i) => (
        <li key={i} className="flex items-center gap-1.5">
          <CheckIcon weight="bold" className={`size-4 ${tone === "dark" ? "text-success" : "text-accent-ink-light"}`} />
          {i}
        </li>
      ))}
    </ul>
  );
}
