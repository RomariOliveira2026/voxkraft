import Link from "next/link";

export function ArticleCta() {
  return (
    <section className="mt-16 rounded-3xl border border-blue-500/30 bg-blue-600/10 p-8 text-center md:p-12">
      <h2 className="text-2xl font-black md:text-3xl">
        Experimente o VoxKraft Gratuitamente
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-slate-300">
        Transforme textos em áudios profissionais com vozes brasileiras de alta
        qualidade.
      </p>
      <Link
        href="/cadastro"
        className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-4 text-lg font-bold transition hover:bg-blue-500"
      >
        Começar Agora
      </Link>
    </section>
  );
}
