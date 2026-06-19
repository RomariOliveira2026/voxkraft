export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type ArticleSection = {
  type: "h2" | "h3" | "p" | "ul";
  content: string;
  items?: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  categoryIds: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  sections: ArticleSection[];
  faq: ArticleFaq[];
};
