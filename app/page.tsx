import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SiteHeader } from "@/components/site/site-header";
import { allArticles } from "@/lib/blog/posts";
import { getCategoryById } from "@/lib/blog/categories";

const featuredArticles = allArticles.slice(0, 3);

export default function Inicio() {
  return (
    <main className="min-h-screen bg-[#070B1F] text-white">
      <SiteHeader />

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-10 flex justify-center px-2">
          <Logo
            variant="full"
            href={false}
            imageClassName="h-16 w-auto max-w-[min(100%,480px)] sm:h-20 md:h-24 lg:h-28"
          />
        </div>

        <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          A revolução brasileira da voz com inteligência artificial.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
          Transforme textos em narrações realistas, crie vozes profissionais e
          dê vida aos seus projetos com tecnologia de ponta.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#demo"
            className="rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white hover:bg-blue-500"
          >
            Testar agora
          </a>

          <a
            href="#planos"
            className="rounded-full border border-white/20 px-8 py-4 text-lg font-bold text-white hover:bg-white/10"
          >
            Ver planos
          </a>
        </div>
      </section>

      <section id="recursos" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Recursos
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-black">
          Tudo o que você precisa para criar áudio profissional
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-bold">Vozes brasileiras naturais</h3>
            <p className="mt-3 text-slate-300">
              Narrações com entonação, ritmo e emoção que soam humanas — ideais
              para o público do Brasil.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-bold">Geração em segundos</h3>
            <p className="mt-3 text-slate-300">
              Cole seu roteiro, escolha a voz e receba um áudio pronto para
              publicar em vídeos, aulas e campanhas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-bold">Qualidade comercial</h3>
            <p className="mt-3 text-slate-300">
              Áudio limpo e profissional para anúncios, podcasts, e-learning e
              conteúdo digital de alto padrão.
            </p>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p
            id="biblioteca"
            className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400"
          >
            Biblioteca de Vozes
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Crie uma narração em segundos
          </h2>

          <p className="mt-4 text-slate-300">
            Cole seu texto, escolha uma voz brasileira e gere um áudio
            profissional pronto para vídeos, aulas, podcasts e anúncios.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-slate-300">
                Seu texto
              </label>
              <textarea
                className="mt-2 h-52 w-full rounded-2xl border border-white/10 bg-[#0B102A] p-4 text-white outline-none focus:border-blue-500"
                placeholder="Cole aqui o texto que deseja transformar em voz..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">
                Escolha a voz
              </label>

              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B102A] p-4 text-white outline-none focus:border-blue-500">
                <option>Lúcio — Narrador clássico</option>
                <option>Aurora — Contadora de histórias</option>
                <option>Caio — Jovem e vendedor</option>
                <option>Isadora — Dramática</option>
                <option>Davi — Natural</option>
                <option>Lara — Profissional</option>
              </select>

              <div className="mt-6 rounded-2xl bg-[#0B102A] p-5">
                <p className="text-sm text-slate-400">Prévia do áudio</p>
                <div className="mt-4 h-16 rounded-xl bg-white/10" />
                <button className="mt-5 w-full rounded-full bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500">
                  Gerar áudio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Planos
        </p>
        <h2 className="mt-4 text-center text-4xl font-black">
          Escolha o plano ideal para o seu projeto
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
          Comece gratuitamente e evolua conforme sua necessidade de produção de
          áudio.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-lg font-bold text-blue-400">Essencial</h3>
            <p className="mt-4 text-4xl font-black">
              Grátis
            </p>
            <p className="mt-2 text-slate-400">Para experimentar a plataforma</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Até 30 minutos de áudio por mês</li>
              <li>Acesso à biblioteca básica de vozes</li>
              <li>Exportação em MP3</li>
            </ul>
            <a
              href="#demo"
              className="mt-8 block rounded-full border border-white/20 py-3 text-center font-bold transition hover:bg-white/10"
            >
              Testar agora
            </a>
          </div>

          <div className="rounded-3xl border border-blue-500 bg-blue-600/10 p-8 ring-1 ring-blue-500">
            <h3 className="text-lg font-bold text-blue-400">Profissional</h3>
            <p className="mt-4 text-4xl font-black">
              R$ 49<span className="text-lg font-medium text-slate-400">/mês</span>
            </p>
            <p className="mt-2 text-slate-400">Para criadores e empresas</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Até 5 horas de áudio por mês</li>
              <li>Todas as vozes premium</li>
              <li>Exportação em MP3 e WAV</li>
              <li>Uso comercial liberado</li>
            </ul>
            <a
              href="#demo"
              className="mt-8 block rounded-full bg-blue-600 py-3 text-center font-bold transition hover:bg-blue-500"
            >
              Começar agora
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-lg font-bold text-blue-400">Empresarial</h3>
            <p className="mt-4 text-4xl font-black">Sob consulta</p>
            <p className="mt-2 text-slate-400">Para equipes e alto volume</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Volume personalizado de áudio</li>
              <li>Vozes exclusivas sob demanda</li>
              <li>Suporte prioritário</li>
              <li>API para integração</li>
            </ul>
            <a
              href="#contato"
              className="mt-8 block rounded-full border border-white/20 py-3 text-center font-bold transition hover:bg-white/10"
            >
              Falar com vendas
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Perguntas frequentes
        </p>
        <h2 className="mt-4 text-center text-4xl font-black">
          Tire suas dúvidas
        </h2>

        <div className="mt-12 space-y-4">
          <details className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <summary className="cursor-pointer font-bold">
              Posso usar os áudios em projetos comerciais?
            </summary>
            <p className="mt-3 text-slate-300">
              Sim. Nos planos Profissional e Empresarial, o uso comercial está
              incluído para vídeos, anúncios, cursos e demais aplicações.
            </p>
          </details>

          <details className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <summary className="cursor-pointer font-bold">
              As vozes são realmente em português brasileiro?
            </summary>
            <p className="mt-3 text-slate-300">
              Sim. Nossa biblioteca foi desenvolvida para o português do Brasil,
              com entonação, sotaque e ritmo naturais para o público nacional.
            </p>
          </details>

          <details className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <summary className="cursor-pointer font-bold">
              Em quais formatos posso exportar o áudio?
            </summary>
            <p className="mt-3 text-slate-300">
              O plano Essencial inclui exportação em MP3. Nos planos pagos, você
              também pode exportar em WAV para máxima qualidade.
            </p>
          </details>

          <details className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <summary className="cursor-pointer font-bold">
              Preciso instalar algum programa?
            </summary>
            <p className="mt-3 text-slate-300">
              Não. O VoxKraft funciona direto no navegador — basta acessar,
              escrever seu texto e gerar o áudio em poucos cliques.
            </p>
          </details>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Blog
        </p>
        <h2 className="mt-4 text-4xl font-black">
          Conteúdos sobre voz, IA e produção de áudio
        </h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Dicas, tendências e tutoriais para elevar a qualidade dos seus
          projetos com narração profissional.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredArticles.map((article) => {
            const category = getCategoryById(article.categoryIds[0]);
            return (
              <article
                key={article.slug}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                {article.featuredImage && (
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative block aspect-video overflow-hidden"
                  >
                    <Image
                      src={article.featuredImage}
                      alt={article.featuredImageAlt ?? article.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F]/80 via-transparent to-transparent" />
                  </Link>
                )}
                <div className="p-6">
                  {category && (
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      {category.name}
                    </p>
                  )}
                  <h3 className="mt-3 text-lg font-bold">
                    <Link href={`/blog/${article.slug}`} className="hover:text-blue-300">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{article.excerpt}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-blue-400 hover:underline"
                  >
                    Ler artigo →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:bg-white/10"
        >
          Ver todos os artigos
        </Link>
      </section>

      <section id="entrar" className="mx-auto max-w-md px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-2xl font-black">Acesse sua conta</h2>
          <p className="mt-3 text-slate-300">
            Entre para gerenciar seus projetos, histórico de áudios e assinatura.
          </p>
          <a
            href="/login"
            className="mt-6 block w-full rounded-full bg-blue-600 px-6 py-4 text-center font-bold hover:bg-blue-500"
          >
            Entrar
          </a>
          <p className="mt-4 text-sm text-slate-400">
            Ainda não tem conta?{" "}
            <a href="/cadastro" className="text-blue-400 hover:underline">
              Começar agora
            </a>
          </p>
        </div>
      </section>

      <footer id="contato" className="border-t border-white/10 bg-[#020B3A] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <Logo variant="horizontal" href="/" imageClassName="h-8 w-auto md:h-9" />
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} VoxKraft. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#recursos" className="transition hover:text-white">
              Recursos
            </a>
            <Link href="/biblioteca" className="transition hover:text-white">
              Biblioteca de Vozes
            </Link>
            <a href="#planos" className="transition hover:text-white">
              Planos
            </a>
            <Link href="/blog" className="transition hover:text-white">
              Blog
            </Link>
            <a href="#faq" className="transition hover:text-white">
              Perguntas frequentes
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
