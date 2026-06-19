import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blog/types";
import { getCategoryById } from "@/lib/blog/categories";
import { formatPublishDate, getReadingTime } from "@/lib/blog/utils";

type BlogCardProps = {
  article: BlogArticle;
  className?: string;
};

export function BlogCard({ article, className = "" }: BlogCardProps) {
  const primaryCategory = getCategoryById(article.categoryIds[0]);
  const readingTime = getReadingTime(article);

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 ${className}`}
    >
      {article.featuredImage && (
        <Link href={`/blog/${article.slug}`} className="relative block aspect-video overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt ?? article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F]/80 via-transparent to-transparent" />
        </Link>
      )}

      <div className="p-6">
        {primaryCategory && (
          <Link
            href={`/blog/categoria/${primaryCategory.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:underline"
          >
            {primaryCategory.name}
          </Link>
        )}

        <h2 className="mt-3 text-xl font-bold leading-snug transition group-hover:text-blue-300">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        <p className="mt-3 line-clamp-3 text-sm text-slate-400">{article.excerpt}</p>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <span>{article.author}</span>
          <span>
            {formatPublishDate(article.publishedAt)} · {readingTime} min de leitura
          </span>
        </div>
      </div>
    </article>
  );
}
