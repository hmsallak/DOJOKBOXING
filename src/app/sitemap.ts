import type { MetadataRoute } from "next";

const BASE = "https://mbt-academy.fr"; // TODO: domaine définitif

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/cours", "/planning", "/tarifs", "/coachs", "/essai", "/contact"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: p === "/planning" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/essai" ? 0.9 : 0.7,
  }));
}
