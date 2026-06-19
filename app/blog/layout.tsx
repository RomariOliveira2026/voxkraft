import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070B1F] text-white">
      <BlogHeader />
      {children}
    </div>
  );
}
