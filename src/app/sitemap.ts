import type { MetadataRoute } from "next";

import { getPublishedPrompts } from "@/lib/prompt-api";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteConfig.url}/prompts`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/generator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];

  try {
    const prompts = await getPublishedPrompts();

    return [
      ...staticRoutes,
      ...prompts.map((prompt) => ({
        url: `${siteConfig.url}/prompts/${prompt.slug}`,
        lastModified: new Date(prompt.updatedAt),
        changeFrequency: "monthly" as const,
        priority: prompt.isFeatured ? 0.8 : 0.6
      }))
    ];
  } catch {
    return staticRoutes;
  }
}
