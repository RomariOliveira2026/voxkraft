import Link from "next/link";

export function HeaderCtaButton() {
  return (
    <Link
      href="/cadastro"
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-600 px-4 py-[10px] text-[14px] leading-none font-bold transition hover:bg-blue-500 md:px-5 md:py-2.5 md:text-sm"
    >
      <span className="md:hidden">Começar</span>
      <span className="hidden md:inline">Começar agora</span>
    </Link>
  );
}
