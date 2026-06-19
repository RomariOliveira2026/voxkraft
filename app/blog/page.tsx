import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import { allArticles, blogCategories } from "@/lib/blog/index";
import { siteConfig } from "@/lib/brand/metadata";

export const metadata: Metadata = {
  title: "Blog — Voz, IA e Produção de Áudio",
  description:
    "Artigos sobre inteligência artificial, narração profissional, YouTube, podcasts, audiobooks e marketing digital. Aprenda a criar áudios de alta qualidade.",
  keywords: [
    "voz IA",
    "narração profissional",
    "inteligência artificial",
    "texto para áudio",
    "VoxKraft",
    "blog voz IA",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Artigos sobre inteligência artificial, narração profissional, YouTube, podcasts, audiobooks e marketing digital.",
    type: "website",
    url: "/blog",
    images: [{ url: siteConfig.ogImage, alt: `${siteConfig.name} Blog` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Artigos sobre voz IA, narração profissional, YouTube, podcasts e marketing digital.",
    images: [siteConfig.ogImage],
  },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Blog" },
        ]}
      />

      <header className="mb-12 mt-6">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">Blog</p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">
          Conteúdos sobre voz, IA e produção de áudio
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Dicas, tendências e tutoriais para elevar a qualidade dos seus projetos
          com narração profissional e converter visitantes em assinantes.
        </p>
      </header>

      <BlogListing articles={allArticles} categories={blogCategories} />
    </main>
  );
}