import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020B3A]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo variant="horizontal" href="/" imageClassName="h-8 w-auto md:h-9" />

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <Link href="/#recursos" className="transition hover:text-white">
            Recursos
          </Link>
          <Link href="/#planos" className="transition hover:text-white">
            Planos
          </Link>
          <Link href="/blog" className="text-white transition">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold transition hover:bg-blue-500"
          >
            Começar agora
          </Link>
        </div>
      </div>
    </header>
  );
}
