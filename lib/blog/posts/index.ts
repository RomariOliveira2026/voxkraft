import type { BlogArticle } from "@/lib/blog/types";
import { getArticleCover } from "@/lib/brand/covers";

function enrichArticle(article: BlogArticle): BlogArticle {
  const cover = getArticleCover(article.slug);
  if (!cover) return article;

  return {
    ...article,
    featuredImage: article.featuredImage ?? cover.src,
    featuredImageAlt: article.featuredImageAlt ?? cover.alt,
  };
}
import { article as narracoesIA } from "./narracoes-profissionais-ia-2026";
import { article as melhoresVozesYoutube } from "./melhores-vozes-ia-youtube";
import { article as textosEmAudio } from "./textos-em-audio-profissional";
import { article as elevenLabsComparativo } from "./elevenlabs-comparativo";
import { article as audiobooksIA } from "./audiobooks-com-ia";
import { article as podcastsIA } from "./podcasts-com-ia";
import { article as ferramentasVozIA } from "./ferramentas-voz-ia";
import { article as monetizarVideosIA } from "./monetizar-videos-ia";
import { article as locucaoDigitalEmpresas } from "./locucao-digital-empresas";
import { article as anunciosVozIA } from "./anuncios-voz-ia";

const rawArticles: BlogArticle[] = [
  narracoesIA,
  melhoresVozesYoutube,
  textosEmAudio,
  elevenLabsComparativo,
  audiobooksIA,
  podcastsIA,
  ferramentasVozIA,
  monetizarVideosIA,
  locucaoDigitalEmpresas,
  anunciosVozIA,
].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export const allArticles: BlogArticle[] = rawArticles.map(enrichArticle);

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return allArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categoryId: string): BlogArticle[] {
  return allArticles.filter((article) =>
    article.categoryIds.includes(categoryId)
  );
}
