import type { ArticleSection } from "@/lib/blog/types";

type ArticleContentProps = {
  sections: ArticleSection[];
};

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <div className="prose prose-invert max-w-none space-y-6">
      {sections.map((section, index) => {
        if (section.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-10 text-2xl font-black tracking-tight text-white first:mt-0"
            >
              {section.content}
            </h2>
          );
        }

        if (section.type === "h3") {
          return (
            <h3 key={index} className="mt-8 text-xl font-bold text-slate-100">
              {section.content}
            </h3>
          );
        }

        if (section.type === "ul" && section.items) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 text-slate-300">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-base leading-relaxed text-slate-300">
            {section.content}
          </p>
        );
      })}
    </div>
  );
}
