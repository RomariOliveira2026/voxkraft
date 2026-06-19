export const articleCovers: Record<
  string,
  { src: string; alt: string }
> = {
  "como-criar-anuncios-com-voz-gerada-por-ia": {
    src: "/blog/covers/anuncios-voz-ia.jpg",
    alt: "Marketing digital com megafone, ondas sonoras e inteligência artificial",
  },
  "guia-completo-locucao-digital-empresas": {
    src: "/blog/covers/locucao-digital-empresas.jpg",
    alt: "Microfone premium e gráfico de crescimento em ambiente corporativo",
  },
  "como-monetizar-videos-narrados-por-ia": {
    src: "/blog/covers/monetizar-videos-ia.jpg",
    alt: "YouTube, play button e monetização com áudio IA",
  },
  "melhores-ferramentas-voz-ia-criadores-conteudo": {
    src: "/blog/covers/ferramentas-voz-ia.jpg",
    alt: "Ferramentas de voz IA para criação de conteúdo",
  },
  "como-usar-ia-para-criar-podcasts-profissionais": {
    src: "/blog/covers/podcasts-com-ia.jpg",
    alt: "Estúdio de podcast com headphones e microfone",
  },
  "como-criar-audiobooks-com-inteligencia-artificial": {
    src: "/blog/covers/audiobooks-com-ia.jpg",
    alt: "Livro aberto com ondas sonoras de narração IA",
  },
  "elevenlabs-vale-a-pena-comparativo-completo": {
    src: "/blog/covers/elevenlabs-comparativo.jpg",
    alt: "Comparativo de plataformas de voz IA — VoxKraft vs concorrentes",
  },
  "transformar-textos-em-audio-profissional": {
    src: "/blog/covers/textos-em-audio-profissional.jpg",
    alt: "Texto sendo transformado em áudio profissional com IA",
  },
  "melhores-vozes-ia-para-videos-youtube": {
    src: "/blog/covers/melhores-vozes-ia-youtube.jpg",
    alt: "Criador de conteúdo no YouTube com voz IA",
  },
  "como-criar-narracoes-profissionais-com-ia-2026": {
    src: "/blog/covers/narracoes-profissionais-ia-2026.jpg",
    alt: "Estúdio futurista de narração profissional com IA",
  },
};

export const COVER_WIDTH = 1200;
export const COVER_HEIGHT = 675;

export function getArticleCover(slug: string) {
  return articleCovers[slug];
}
