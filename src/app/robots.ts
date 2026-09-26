import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://mbt-academy.fr/sitemap.xml", // TODO: domaine définitif
  };
}
