export const voiceCategories = [
  { id: "masculina", label: "Masculina" },
  { id: "feminina", label: "Feminina" },
  { id: "narrador", label: "Narrador" },
  { id: "podcast", label: "Podcast" },
  { id: "comercial", label: "Comercial" },
  { id: "institucional", label: "Institucional" },
  { id: "nordestina", label: "Nordestina" },
] as const;

export type VoiceCategoryId = (typeof voiceCategories)[number]["id"];
