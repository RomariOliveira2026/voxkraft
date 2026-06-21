import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { HeaderCtaButton } from "@/components/site/header-cta-button";

const navLinks = [
  { href: "/#recursos", label: "Recursos" },
  { href: "/biblioteca", label: "Biblioteca de Vozes" },
  { href: "/#planos", label: "Planos" },
  { href: "/blog", label: "Blog" },
] as const;

type SiteHeaderProps = {
  activePath?: string;
};

export function SiteHeader({ activePath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020B3A]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo variant="horizontal" href="/" imageClassName="h-8 w-auto sm:h-9 md:h-10" />

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => {
            const isActive =
              activePath === link.href ||
              (link.href === "/biblioteca" && activePath === "/biblioteca");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${isActive ? "text-white" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            Entrar
          </Link>
          <HeaderCtaButton />
        </div>
      </div>
    </header>
  );
}
