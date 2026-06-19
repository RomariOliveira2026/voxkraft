import type { Metadata } from "next";
import { OFFICIAL_OG } from "@/lib/brand/logo-asset";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://voxkraft.com.br";

export const siteConfig = {
  name: "VoxKraft",
  brandName: "VOXKRAFT",
  tagline: "Voz com inteligência artificial",
  description:
    "Transforme textos em narrações realistas com vozes brasileiras profissionais. Crie áudios para vídeos, aulas, podcasts e anúncios.",
  url: siteUrl,
  ogImage: "/brand/og-image.png",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "voz IA",
    "narração com inteligência artificial",
    "text to speech brasileiro",
    "VoxKraft",
    "gerador de voz",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteUrl,
    images: [
      {
        url: siteConfig.ogImage,
        width: OFFICIAL_OG.width,
        height: OFFICIAL_OG.height,
        alt: siteConfig.brandName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon.png", type: "image/png", sizes: "178x96" },
    ],
    apple: [{ url: "/brand/favicon-256.png", type: "image/png", sizes: "256x256" }],
    shortcut: ["/brand/favicon-32.png"],
  },
};
