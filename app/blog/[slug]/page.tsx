import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/article-content";
import { ArticleCta } from "@/components/blog/article-cta";
import { ArticleFaq } from "@/components/blog/article-faq";
import { ArticleRelated } from "@/components/blog/article-related";
import { ArticleSchema } from "@/components/blog/article-schema";
import { ArticleShare } from "@/components/blog/article-share";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import {
  allArticles,
  getArticleBySlug,
  getCategoryById,
} from "@/lib/blog/index";
import {
  formatPublishDate,
  getArticleSchema,
  getFaqSchema,
  getReadingTime,
  getRelatedArticles,
} from "@/lib/blog/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Artigo não encontrado — VoxKraft" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://voxkraft.com.br";
  const imageUrl = article.featuredImage
    ? `${baseUrl}${article.featuredImage}`
    : `${baseUrl}/brand/og-image.png`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: [...article.primaryKeywords, ...article.secondaryKeywords],
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      type: "article",
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: article.featuredImageAlt ?? article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://voxkraft.com.br";
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  const readingTime = getReadingTime(article);
  const related = getRelatedArticles(article, allArticles);
  const categories = article.categoryIds
    .map((id) => getCategoryById(id))
    .filter(Boolean);
  const primaryCategory = categories[0];

  return (
    <>
      <ArticleSchema
        articleSchema={getArticleSchema(article, baseUrl)}
        faqSchema={getFaqSchema(article.faq)}
      />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Blog", href: "/blog" },
            ...(primaryCategory
              ? [{ label: primaryCategory.name, href: `/blog/categoria/${primaryCategory.slug}` }]
              : []),
            { label: article.title },
          ]}
        />

        {article.featuredImage && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt ?? article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <header className="mt-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(
              (category) =>
                category && (
                  <Link
                    key={category.id}
                    href={`/blog/categoria/${category.slug}`}
                    className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-blue-600/30"
                  >
                    {category.name}
                  </Link>
                ),
            )}
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-4 text-lg text-slate-300">{article.excerpt}</p>

          <div className="mt-6 flex flex-col gap-4 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-slate-400">{article.authorRole}</p>
            </div>
            <div className="text-sm text-slate-400">
              <p>{formatPublishDate(article.publishedAt)}</p>
              <p>{readingTime} min de leitura</p>
            </div>
          </div>

          <div className="mt-6">
            <ArticleShare title={article.title} url={articleUrl} />
          </div>
        </header>

        <article className="mt-10">
          <ArticleContent sections={article.sections} />
        </article>

        <ArticleFaq faq={article.faq} />
        <ArticleCta />
        <ArticleRelated articles={related} />
      </main>
    </>
  );
}
