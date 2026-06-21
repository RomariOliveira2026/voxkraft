import type { MetadataRoute } from "next";
import { allArticles } from "@/lib/blog/posts";
import { blogCategories } from "@/lib/blog/categories";
import { siteConfig } from "@/lib/brand/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const posts = allArticles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = blogCategories.map((category) => ({
    url: `${base}/blog/categoria/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/biblioteca`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts,
    ...categories,
  ];
}
