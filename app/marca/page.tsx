import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { OFFICIAL_LOGO } from "@/lib/brand/logo-asset";

export default function MarcaPage() {
  return (
    <main className="min-h-screen bg-[#070B1F] text-white">
      <header className="border-b border-white/10 bg-[#020B3A] px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <h1 className="text-xl font-black">Logo oficial VOXKRAFT</h1>
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <p className="text-slate-400">
          Versão aprovada e em uso em todo o site. Arquivo congelado — não alterar.
        </p>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Logo variant="full" href={false} height={64} className="w-full justify-center p-8" />
        </div>

        <p className="font-mono text-sm text-blue-400">{OFFICIAL_LOGO.src}</p>

        <div className="relative aspect-[1536/512] w-full overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={OFFICIAL_LOGO.src}
            alt={OFFICIAL_LOGO.alt}
            fill
            unoptimized
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </main>
  );
}
