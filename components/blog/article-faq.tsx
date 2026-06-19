import type { ArticleFaq } from "@/lib/blog/types";

type ArticleFaqProps = {
  faq: ArticleFaq[];
};

export function ArticleFaq({ faq }: ArticleFaqProps) {
  return (
    <section className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <h2 className="text-2xl font-black">Perguntas frequentes</h2>
      <div className="mt-6 space-y-4">
        {faq.map((item) => (
          <details
            key={item.question}
            className="rounded-xl border border-white/10 bg-[#070B1F]/50 p-5"
          >
            <summary className="cursor-pointer font-bold">{item.question}</summary>
            <p className="mt-3 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
