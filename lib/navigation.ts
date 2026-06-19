export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const appNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Gerar Áudio", href: "/dashboard/gerar-audio", icon: "audio" },
  { label: "Biblioteca de Vozes", href: "/dashboard/biblioteca", icon: "library" },
  { label: "Meus Projetos", href: "/dashboard/projetos", icon: "projects" },
  { label: "Histórico", href: "/dashboard/historico", icon: "history" },
  { label: "Assinatura", href: "/dashboard/assinatura", icon: "subscription" },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: "settings" },
];
