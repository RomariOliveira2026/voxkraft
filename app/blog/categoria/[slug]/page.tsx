import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import { allArticles, blogCategories, getCategoryBySlug } from "@/lib/blog/index";
import { siteConfig } from "@/lib/brand/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Categoria não encontrada" };
  }

  return {
    title: `${category.name} — Blog`,
    description: category.description,
    alternates: {
      canonical: `/blog/categoria/${slug}`,
    },
    openGraph: {
      title: `${category.name} | ${siteConfig.name} Blog`,
      description: category.description,
      type: "website",
      url: `/blog/categoria/${slug}`,
      images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${siteConfig.name} Blog`,
      description: category.description,
      images: [siteConfig.ogImage],
    },
  };
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <Link href="/blog" className="text-sm text-blue-400 hover:underline">
          ← Voltar ao blog
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Categoria
        </p>
        <h1 className="mt-4 text-4xl font-black">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">{category.description}</p>
      </header>

      <BlogListing
        articles={allArticles}
        categories={blogCategories}
        initialCategory={category.slug}
      />
    </main>
  );
}
