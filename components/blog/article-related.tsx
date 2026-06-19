import type { BlogArticle } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/blog-card";

type ArticleRelatedProps = {
  articles: BlogArticle[];
};

export function ArticleRelated({ articles }: ArticleRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <h2 className="text-2xl font-black">Artigos relacionados</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
