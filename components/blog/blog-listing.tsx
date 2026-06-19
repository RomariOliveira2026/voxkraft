"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogArticle } from "@/lib/blog/types";
import type { BlogCategory } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/blog-card";
import { filterByCategory, searchArticles } from "@/lib/blog/utils";

type BlogListingProps = {
  articles: BlogArticle[];
  categories: BlogCategory[];
  initialCategory?: string;
  initialQuery?: string;
};

export function BlogListing({
  articles,
  categories,
  initialCategory,
  initialQuery = "",
}: BlogListingProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? null);

  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory) {
      result = filterByCategory(result, activeCategory);
    }
    if (query.trim()) {
      result = searchArticles(result, query);
    }
    return result;
  }, [articles, activeCategory, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 lg:max-w-md"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !activeCategory
              ? "bg-blue-600 text-white"
              : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog/categoria/${category.slug}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory(category.slug);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === category.slug
                ? "bg-blue-600 text-white"
                : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Nenhum artigo encontrado. Tente outra busca ou categoria.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {filtered.map((article) => (
            <div
              key={article.slug}
              className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <BlogCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
