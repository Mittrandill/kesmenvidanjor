import type { MetadataRoute } from "next";
import { siteConfig, services, regions } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ["", "/hizmetler", "/bolgeler", "/hakkimizda", "/iletisim"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const regionRoutes = regions.map((r) => ({
    url: `${base}/bolgeler/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comboRoutes = regions.flatMap((r) =>
    services.map((s) => ({
      url: `${base}/${r.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...regionRoutes, ...comboRoutes];
}
