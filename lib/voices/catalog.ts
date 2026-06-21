import type { VoiceCategoryId } from "@/lib/voices/categories";

export type CatalogVoice = {
  slug: string;
  name: string;
  description: string;
  categories: VoiceCategoryId[];
  colorClass: string;
  previewUrl: string;
  isPremium?: boolean;
};

const demo = (slug: string) => `/voices/demos/${slug}.mp3`;

export const voiceCatalog: CatalogVoice[] = [
  {
    slug: "lucio",
    name: "Lúcio",
    description: "Narrador clássico com tom grave e presença marcante.",
    categories: ["masculina", "narrador", "institucional"],
    colorClass: "from-blue-600/20 to-blue-900/20",
    previewUrl: demo("lucio"),
  },
  {
    slug: "henrique",
    name: "Henrique",
    description: "Ideal para documentários, storytelling e conteúdo longo.",
    categories: ["masculina", "narrador"],
    colorClass: "from-indigo-600/20 to-indigo-900/20",
    previewUrl: demo("henrique"),
  },
  {
    slug: "davi",
    name: "Davi",
    description: "Tom natural e conversacional, perfeito para diálogos.",
    categories: ["masculina", "podcast"],
    colorClass: "from-amber-600/20 to-amber-900/20",
    previewUrl: demo("davi"),
  },
  {
    slug: "bruno",
    name: "Bruno",
    description: "Jovem e dinâmico, com energia para formatos digitais.",
    categories: ["masculina", "podcast"],
    colorClass: "from-orange-600/20 to-orange-900/20",
    previewUrl: demo("bruno"),
  },
  {
    slug: "caio",
    name: "Caio",
    description: "Vendedor nato — direto, persuasivo e com ritmo comercial.",
    categories: ["masculina", "comercial"],
    colorClass: "from-emerald-600/20 to-emerald-900/20",
    previewUrl: demo("caio"),
  },
  {
    slug: "gustavo",
    name: "Gustavo",
    description: "Corporativo e confiável para apresentações e treinamentos.",
    categories: ["masculina", "institucional", "comercial"],
    colorClass: "from-cyan-600/20 to-cyan-900/20",
    previewUrl: demo("gustavo"),
  },
  {
    slug: "ze-do-mar",
    name: "Zé do Mar",
    description: "Sotaque nordestino autêntico com calor humano.",
    categories: ["masculina", "nordestina"],
    colorClass: "from-yellow-600/20 to-yellow-900/20",
    previewUrl: demo("ze-do-mar"),
  },
  {
    slug: "aurora",
    name: "Aurora",
    description: "Contadora de histórias com entonação envolvente.",
    categories: ["feminina", "narrador"],
    colorClass: "from-purple-600/20 to-purple-900/20",
    previewUrl: demo("aurora"),
  },
  {
    slug: "lara",
    name: "Lara",
    description: "Profissional e clara para e-learning e comunicação interna.",
    categories: ["feminina", "institucional"],
    colorClass: "from-cyan-600/20 to-cyan-900/20",
    previewUrl: demo("lara"),
    isPremium: true,
  },
  {
    slug: "beatriz",
    name: "Beatriz",
    description: "Objetiva e persuasiva para spots e chamadas de rádio.",
    categories: ["feminina", "comercial"],
    colorClass: "from-rose-600/20 to-rose-900/20",
    previewUrl: demo("beatriz"),
  },
  {
    slug: "vitoria",
    name: "Vitória",
    description: "Energia alta para campanhas e redes sociais.",
    categories: ["feminina", "comercial"],
    colorClass: "from-pink-600/20 to-pink-900/20",
    previewUrl: demo("vitoria"),
  },
  {
    slug: "marina",
    name: "Marina",
    description: "Leve e envolvente para episódios e entrevistas.",
    categories: ["feminina", "podcast"],
    colorClass: "from-violet-600/20 to-violet-900/20",
    previewUrl: demo("marina"),
  },
  {
    slug: "isadora",
    name: "Isadora",
    description: "Dramática e expressiva para narrativas emocionais.",
    categories: ["feminina", "narrador"],
    colorClass: "from-rose-600/20 to-rose-900/20",
    previewUrl: demo("isadora"),
    isPremium: true,
  },
  {
    slug: "camila",
    name: "Camila",
    description: "Suave e acolhedora para boas-vindas e atendimento.",
    categories: ["feminina", "institucional"],
    colorClass: "from-teal-600/20 to-teal-900/20",
    previewUrl: demo("camila"),
  },
  {
    slug: "iracema",
    name: "Iracema",
    description: "Voz nordestina feminina com charme e autenticidade.",
    categories: ["feminina", "nordestina"],
    colorClass: "from-lime-600/20 to-lime-900/20",
    previewUrl: demo("iracema"),
  },
  {
    slug: "rafael",
    name: "Rafael",
    description: "Tom grave e institucional para vídeos corporativos.",
    categories: ["masculina", "institucional", "narrador"],
    colorClass: "from-slate-600/20 to-slate-900/20",
    previewUrl: demo("rafael"),
  },
];
