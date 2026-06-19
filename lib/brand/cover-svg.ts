const NAVY = "#020B3A";
const BLUE = "#2563EB";
const BLUE_LIGHT = "#3B82F6";
const GOLD = "#D4A853";
const SILVER = "#C8D4E8";

type CoverTheme = {
  accent: string;
  label: string;
  elements: string;
};

const themes: Record<string, CoverTheme> = {
  "narracoes-profissionais-ia-2026": {
    accent: GOLD,
    label: "Narração IA 2026",
    elements: `
      <rect x="1200" y="380" width="520" height="320" rx="24" fill="${NAVY}" stroke="${GOLD}" stroke-width="2" opacity="0.9"/>
      <circle cx="1460" cy="500" r="80" fill="none" stroke="${BLUE_LIGHT}" stroke-width="3"/>
      <path d="M1460 440 L1460 560 M1420 500 L1500 500" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>
      <path d="M1280 620 Q1360 580 1440 620 T1600 620" stroke="${BLUE_LIGHT}" stroke-width="2" fill="none" opacity="0.8"/>
    `,
  },
  "melhores-vozes-ia-youtube": {
    accent: "#FF4444",
    label: "YouTube + IA",
    elements: `
      <rect x="1180" y="360" width="560" height="360" rx="20" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/>
      <polygon points="1340,480 1340,600 1460,540" fill="${GOLD}"/>
      <rect x="1520" y="420" width="180" height="120" rx="8" fill="${NAVY}" stroke="${SILVER}" stroke-width="1.5"/>
      <path d="M1540 500 Q1580 460 1620 500 T1700 500" stroke="${BLUE_LIGHT}" stroke-width="3" fill="none"/>
    `,
  },
  "textos-em-audio-profissional": {
    accent: BLUE_LIGHT,
    label: "Texto → Áudio",
    elements: `
      <rect x="1200" y="400" width="280" height="360" rx="12" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/>
      <line x1="1240" y1="460" x2="1440" y2="460" stroke="${SILVER}" stroke-width="3" opacity="0.5"/>
      <line x1="1240" y1="520" x2="1400" y2="520" stroke="${SILVER}" stroke-width="3" opacity="0.4"/>
      <path d="M1520 560 L1680 560 L1680 620 Q1740 620 1740 560 L1740 500 Q1680 500 1680 560" fill="${GOLD}" opacity="0.9"/>
      <path d="M1560 500 Q1620 420 1680 500" stroke="${BLUE_LIGHT}" stroke-width="4" fill="none"/>
    `,
  },
  "elevenlabs-comparativo": {
    accent: GOLD,
    label: "Comparativo",
    elements: `
      <rect x="1180" y="380" width="240" height="300" rx="16" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/>
      <rect x="1460" y="380" width="240" height="300" rx="16" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>
      <text x="1300" y="530" text-anchor="middle" fill="${SILVER}" font-size="28" font-family="system-ui">A</text>
      <text x="1580" y="530" text-anchor="middle" fill="${GOLD}" font-size="28" font-family="system-ui">B</text>
      <path d="M1720 500 L1780 500" stroke="${GOLD}" stroke-width="3"/><polygon points="1780,500 1760,490 1760,510" fill="${GOLD}"/>
    `,
  },
  "audiobooks-com-ia": {
    accent: GOLD,
    label: "Audiobooks",
    elements: `
      <path d="M1240 680 C1240 560 1320 500 1400 500 L1520 500 L1520 700 C1440 700 1240 680 1240 640 Z" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>
      <path d="M1520 500 L1640 500 C1720 500 1760 560 1760 640 L1760 700 L1520 700 Z" fill="${NAVY}" stroke="${GOLD}" stroke-width="2"/>
      <path d="M1280 620 Q1400 560 1520 620 T1760 620" stroke="${BLUE_LIGHT}" stroke-width="3" fill="none" opacity="0.9"/>
    `,
  },
  "podcasts-com-ia": {
    accent: BLUE_LIGHT,
    label: "Podcast IA",
    elements: `
      <rect x="1360" y="400" width="100" height="200" rx="50" fill="url(#micGrad)" stroke="${SILVER}" stroke-width="2"/>
      <path d="M1410 620 L1410 680 M1370 680 L1450 680" stroke="${SILVER}" stroke-width="4" stroke-linecap="round"/>
      <rect x="1520" y="440" width="320" height="200" rx="16" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/>
      <circle cx="1580" cy="520" r="8" fill="${GOLD}"/><circle cx="1620" cy="520" r="8" fill="${BLUE_LIGHT}"/><circle cx="1660" cy="520" r="8" fill="${GOLD}"/>
    `,
  },
  "ferramentas-voz-ia": {
    accent: GOLD,
    label: "Ferramentas",
    elements: `
      <rect x="1200" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${BLUE_LIGHT}" stroke-width="2"/>
      <rect x="1410" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>
      <rect x="1620" y="400" width="180" height="140" rx="12" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/>
      <path d="M1290 620 Q1410 560 1530 620 T1770 620" stroke="${BLUE_LIGHT}" stroke-width="2" fill="none"/>
    `,
  },
  "monetizar-videos-ia": {
    accent: GOLD,
    label: "Monetização",
    elements: `
      <rect x="1200" y="380" width="500" height="320" rx="20" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>
      <text x="1450" y="500" text-anchor="middle" fill="${GOLD}" font-size="64" font-family="system-ui" font-weight="bold">$</text>
      <path d="M1280 580 Q1450 520 1620 580" stroke="${BLUE_LIGHT}" stroke-width="3" fill="none"/>
      <polygon points="1340,620 1340,700 1420,660" fill="#FF4444" opacity="0.9"/>
    `,
  },
  "locucao-digital-empresas": {
    accent: SILVER,
    label: "Locução Corporativa",
    elements: `
      <rect x="1200" y="360" width="400" height="280" rx="8" fill="#0A1640" stroke="${SILVER}" stroke-width="2"/>
      <rect x="1240" y="400" width="120" height="160" rx="4" fill="${NAVY}" stroke="${GOLD}" stroke-width="1.5"/>
      <circle cx="1480" cy="480" r="60" fill="none" stroke="${BLUE_LIGHT}" stroke-width="3"/>
      <path d="M1480 430 L1480 530 M1440 480 L1520 480" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  "anuncios-voz-ia": {
    accent: GOLD,
    label: "Anúncios em Áudio",
    elements: `
      <circle cx="1400" cy="520" r="100" fill="none" stroke="${BLUE_LIGHT}" stroke-width="2" opacity="0.6"/>
      <circle cx="1400" cy="520" r="70" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.8"/>
      <rect x="1520" y="420" width="280" height="200" rx="16" fill="#0A1640" stroke="${GOLD}" stroke-width="2"/>
      <path d="M1560 520 Q1620 460 1680 520 T1800 520" stroke="${BLUE_LIGHT}" stroke-width="4" fill="none"/>
    `,
  },
};

export function buildCoverSvg(key: keyof typeof themes, title: string) {
  const theme = themes[key];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1920" y2="1080">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="50%" stop-color="#0A1640"/>
      <stop offset="100%" stop-color="#061028"/>
    </linearGradient>
    <linearGradient id="micGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${SILVER}"/>
      <stop offset="100%" stop-color="${BLUE}"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect width="1920" height="1080" fill="url(#glow)"/>
  <circle cx="200" cy="150" r="2" fill="${GOLD}" opacity="0.7"/>
  <circle cx="1700" cy="200" r="1.5" fill="${GOLD}" opacity="0.5"/>
  <circle cx="1600" cy="900" r="1.8" fill="${SILVER}" opacity="0.4"/>
  <path d="M0 800 Q480 720 960 800 T1920 800 L1920 1080 L0 1080 Z" fill="${BLUE}" opacity="0.08"/>
  <path d="M80 540 Q200 500 320 540 T560 540" stroke="${BLUE_LIGHT}" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M100 580 Q220 540 340 580 T580 580" stroke="${GOLD}" stroke-width="1.5" fill="none" opacity="0.4"/>
  <text x="100" y="120" fill="${GOLD}" font-size="22" font-family="system-ui,sans-serif" font-weight="700" letter-spacing="6">VOXCRAFT</text>
  <text x="100" y="180" fill="${theme.accent}" font-size="18" font-family="system-ui,sans-serif" font-weight="600" opacity="0.9">${theme.label}</text>
  <text x="100" y="320" fill="${SILVER}" font-size="52" font-family="system-ui,sans-serif" font-weight="800" max-width="900">
    <tspan x="100" dy="0">${title.length > 55 ? title.slice(0, 55) + "…" : title}</tspan>
  </text>
  ${theme.elements}
  <rect x="100" y="980" width="200" height="4" rx="2" fill="${GOLD}" opacity="0.8"/>
</svg>`;
}
