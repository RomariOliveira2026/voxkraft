/**
 * Camada de dados do blog — conteúdo estático local.
 * Futuro: substituir por fetch de CMS/banco (Supabase, Contentful, etc.)
 */
export {
  allArticles,
  getArticleBySlug,
  getArticlesByCategory,
} from "@/lib/blog/posts";

export { blogCategories, getCategoryBySlug, getCategoryById } from "@/lib/blog/categories";
export type { BlogArticle, BlogCategory, ArticleSection, ArticleFaq } from "@/lib/blog/types";
