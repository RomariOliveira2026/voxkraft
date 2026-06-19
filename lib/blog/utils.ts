import type { BlogArticle } from "@/lib/blog/types";
import { getCategoryById, getCategoryBySlug } from "@/lib/blog/categories";
import { OFFICIAL_LOGO } from "@/lib/brand/logo-asset";

const WORDS_PER_MINUTE = 220;

export function countWords(article: BlogArticle) {
  const text = article.sections
    .map((s) => {
      if (s.type === "ul") return s.items?.join(" ") ?? "";
      return s.content;
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function getReadingTime(article: BlogArticle) {
  const words = countWords(article);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatPublishDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function searchArticles(articles: BlogArticle[], query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return articles;

  return articles.filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.seoTitle,
      ...article.primaryKeywords,
      ...article.secondaryKeywords,
      ...article.categoryIds.map((id) => getCategoryById(id)?.name ?? ""),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filterByCategory(articles: BlogArticle[], categorySlug: string | null) {
  if (!categorySlug) return articles;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return articles;
  return articles.filter((a) => a.categoryIds.includes(cat.id));
}

export function getRelatedArticles(article: BlogArticle, all: BlogArticle[], limit = 3) {
  return all
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      article: a,
      score: a.categoryIds.filter((id) => article.categoryIds.includes(id)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.article);
}

export function getArticleSchema(article: BlogArticle, url: string) {
  const imageUrl = article.featuredImage
    ? `${url}${article.featuredImage}`
    : `${url}/brand/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle,
    description: article.metaDescription,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "VoxKraft",
      logo: {
        "@type": "ImageObject",
        url: `${url}${OFFICIAL_LOGO.src}`,
        width: OFFICIAL_LOGO.width,
        height: OFFICIAL_LOGO.height,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${article.slug}`,
    },
    keywords: [...article.primaryKeywords, ...article.secondaryKeywords].join(", "),
  };
}

export function getFaqSchema(faq: BlogArticle["faq"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
