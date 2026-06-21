import type { Metadata } from "next";
import Link from "next/link";
import { VoiceLibrary } from "@/components/voices/voice-library";
import { siteConfig } from "@/lib/brand/metadata";
import { voiceCatalog } from "@/lib/voices/catalog";

export const metadata: Metadata = {
  title: "Biblioteca de Vozes",
  description:
    "Explore vozes brasileiras em português do Brasil. Ouça demonstrações de vozes masculinas, femininas, narrador, podcast, comercial, institucional e nordestina.",
  keywords: [
    "biblioteca de vozes",
    "vozes IA brasileiras",
    "narração profissional",
    "text to speech português",
    "VoxKraft",
  ],
  alternates: {
    canonical: "/biblioteca",
  },
  openGraph: {
    title: `Biblioteca de Vozes | ${siteConfig.name}`,
    description:
      "Ouça demonstrações de vozes brasileiras para vídeos, podcasts, anúncios e conteúdo institucional.",
    type: "website",
    url: "/biblioteca",
    images: [{ url: siteConfig.ogImage, alt: `${siteConfig.name} Biblioteca de Vozes` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Biblioteca de Vozes | ${siteConfig.name}`,
    description:
      "Explore e ouça demonstrações de vozes brasileiras profissionais com inteligência artificial.",
    images: [siteConfig.ogImage],
  },
};

export default function BibliotecaPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition hover:text-white">
              Início
            </Link>
          </li>
          <li aria-hidden className="text-slate-600">
            /
          </li>
          <li className="text-white">Biblioteca de Vozes</li>
        </ol>
      </nav>

      <header className="mb-12 mt-6">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Biblioteca de Vozes
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">
          Vozes brasileiras para cada tipo de projeto
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Ouça demonstrações, compare estilos e escolha a voz ideal para vídeos,
          podcasts, anúncios, treinamentos e conteúdo institucional.
        </p>
      </header>

      <VoiceLibrary voices={voiceCatalog} />
    </main>
  );
}
