type ArticleSchemaProps = {
  articleSchema: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
};

export function ArticleSchema({ articleSchema, faqSchema }: ArticleSchemaProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
