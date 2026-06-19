import type { BlogCategory } from "@/lib/blog/types";

export const blogCategories: BlogCategory[] = [
  {
    id: "ia",
    slug: "inteligencia-artificial",
    name: "Inteligência Artificial",
    description: "Tendências, ferramentas e estratégias de IA aplicadas à produção de voz.",
  },
  {
    id: "narracao",
    slug: "narracao-profissional",
    name: "Narração Profissional",
    description: "Técnicas de locução, entonação e qualidade de áudio para projetos profissionais.",
  },
  {
    id: "marketing",
    slug: "marketing-digital",
    name: "Marketing Digital",
    description: "Como usar voz e áudio para campanhas, anúncios e conversão.",
  },
  {
    id: "youtube",
    slug: "youtube",
    name: "YouTube",
    description: "Produção de vídeos, narração e crescimento de canais com IA.",
  },
  {
    id: "podcast",
    slug: "podcast",
    name: "Podcast",
    description: "Criação, edição e distribuição de podcasts com vozes sintéticas.",
  },
  {
    id: "audiobooks",
    slug: "audiobooks",
    name: "Audiobooks",
    description: "Produção de audiolivros profissionais com inteligência artificial.",
  },
  {
    id: "elearning",
    slug: "e-learning",
    name: "E-learning",
    description: "Narração para cursos online, treinamentos corporativos e educação digital.",
  },
  {
    id: "producao",
    slug: "producao-de-conteudo",
    name: "Produção de Conteúdo",
    description: "Fluxos de trabalho, ferramentas e boas práticas para criadores.",
  },
];

export function getCategoryBySlug(slug: string) {
  return blogCategories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string) {
  return blogCategories.find((c) => c.id === id);
}
