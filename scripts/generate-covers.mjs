import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "blog", "covers");

const covers = [
  ["narracoes-profissionais-ia-2026", "Como criar narrações profissionais com IA em 2026"],
  ["melhores-vozes-ia-youtube", "As melhores vozes de IA para vídeos do YouTube"],
  ["textos-em-audio-profissional", "Como transformar textos em áudio profissional"],
  ["elevenlabs-comparativo", "ElevenLabs vale a pena? Comparativo completo"],
  ["audiobooks-com-ia", "Como criar audiobooks com Inteligência Artificial"],
  ["podcasts-com-ia", "Como usar IA para criar podcasts profissionais"],
  ["ferramentas-voz-ia", "Melhores ferramentas de voz IA para criadores"],
  ["monetizar-videos-ia", "Como monetizar vídeos narrados por IA"],
  ["locucao-digital-empresas", "Guia completo de locução digital para empresas"],
  ["anuncios-voz-ia", "Como criar anúncios com voz gerada por IA"],
];

const NAVY = "#020B3A";
const BLUE_LIGHT = "#3B82F6";
const GOLD = "#D4A853";
const SILVER = "#C8D4E8";

const themes = {
  "narracoes-profissionais-ia-2026": {
    accent: GOLD,
    label: "Narração IA 2026",
    elements: `<rect x="1200" y="380" width="520" height="320" rx="24" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/><circle cx="1460" cy="500" r="80" fill="none" stroke="${BLUE_LIGHT}" stroke-width="3"/><path d="M1460 440 L1460 560 M1420 500 L1500 500" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>`,
  },
  "melhores-vozes-ia-youtube": {
    accent: "#FF4444",
    label: "YouTube + IA",
    elements: `<rect x="1180" y="360" width="560" height="360" rx="20" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/><polygon points="1340,480 1340,600 1460,540" fill="${GOLD}"/><path d="M1540 500 Q1580 460 1620 500 T1700 500" stroke="${BLUE_LIGHT}" stroke-width="3" fill="none"/>`,
  },
  "textos-em-audio-profissional": {
    accent: BLUE_LIGHT,
    label: "Texto → Áudio",
    elements: `<rect x="1200" y="400" width="280" height="360" rx="12" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/><line x1="1240" y1="460" x2="1440" y2="460" stroke="${SILVER}" stroke-width="3" opacity="0.5"/><path d="M1560 500 Q1620 420 1680 500" stroke="${BLUE_LIGHT}" stroke-width="4" fill="none"/>`,
  },
  "elevenlabs-comparativo": {
    accent: GOLD,
    label: "Comparativo",
    elements: `<rect x="1180" y="380" width="240" height="300" rx="16" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/><rect x="1460" y="380" width="240" height="300" rx="16" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>`,
  },
  "audiobooks-com-ia": {
    accent: GOLD,
    label: "Audiobooks",
    elements: `<path d="M1240 680 C1240 560 1320 500 1400 500 L1520 500 L1520 700 C1440 700 1240 680 1240 640 Z" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/><path d="M1280 620 Q1400 560 1520 620 T1760 620" stroke="${BLUE_LIGHT}" stroke-width="3" fill="none"/>`,
  },
  "podcasts-com-ia": {
    accent: BLUE_LIGHT,
    label: "Podcast IA",
    elements: `<rect x="1360" y="400" width="100" height="200" rx="50" fill="${BLUE_LIGHT}" opacity="0.25" stroke="${SILVER}" stroke-width="2"/><rect x="1520" y="440" width="320" height="200" rx="16" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/>`,
  },
  "ferramentas-voz-ia": {
    accent: GOLD,
    label: "Ferramentas",
    elements: `<rect x="1200" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/><rect x="1410" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/><rect x="1620" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/>`,
  },
  "monetizar-videos-ia": {
    accent: GOLD,
    label: "Monetização",
    elements: `<rect x="1200" y="380" width="500" height="320" rx="20" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/><text x="1450" y="520" text-anchor="middle" fill="${GOLD}" font-size="72" font-family="system-ui">$</text><polygon points="1340,620 1340,700 1420,660" fill="#FF4444" opacity="0.9"/>`,
  },
  "locucao-digital-empresas": {
    accent: SILVER,
    label: "Locução Corporativa",
    elements: `<rect x="1200" y="360" width="400" height="280" rx="8" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/><circle cx="1480" cy="480" r="60" fill="none" stroke="${BLUE_LIGHT}" stroke-width="3"/><path d="M1480 430 L1480 530 M1440 480 L1520 480" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>`,
  },
  "anuncios-voz-ia": {
    accent: GOLD,
    label: "Anúncios em Áudio",
    elements: `<circle cx="1400" cy="520" r="100" fill="none" stroke="${BLUE_LIGHT}" stroke-width="2"/><circle cx="1400" cy="520" r="70" fill="none" stroke="${GOLD}" stroke-width="2"/><path d="M1560 520 Q1620 460 1680 520 T1800 520" stroke="${BLUE_LIGHT}" stroke-width="4" fill="none"/>`,
  },
};

function build(key, title) {
  const t = themes[key];
  const displayTitle = title.length > 58 ? `${title.slice(0, 58)}…` : title;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1920" y2="1080">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#061028"/>
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="45%" r="45%">
      <stop offset="0%" stop-color="${BLUE_LIGHT}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect width="1920" height="1080" fill="url(#glow)"/>
  <circle cx="200" cy="150" r="2" fill="${GOLD}" opacity="0.7"/>
  <circle cx="1700" cy="200" r="1.5" fill="${GOLD}" opacity="0.5"/>
  <path d="M80 540 Q200 500 320 540 T560 540" stroke="${BLUE_LIGHT}" stroke-width="2" fill="none" opacity="0.5"/>
  <text x="100" y="120" fill="${GOLD}" font-size="22" font-family="system-ui,sans-serif" font-weight="700" letter-spacing="6">VOXCRAFT</text>
  <text x="100" y="180" fill="${t.accent}" font-size="18" font-family="system-ui,sans-serif" font-weight="600">${t.label}</text>
  <text x="100" y="300" fill="${SILVER}" font-size="48" font-family="system-ui,sans-serif" font-weight="800">${displayTitle}</text>
  ${t.elements}
  <rect x="100" y="980" width="200" height="4" rx="2" fill="${GOLD}" opacity="0.8"/>
</svg>`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const [file, title] of covers) {
  fs.writeFileSync(path.join(outDir, `${file}.svg`), build(file, title));
}
console.log(`Generated ${covers.length} cover SVGs`);
