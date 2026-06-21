import { SiteHeader } from "@/components/site/site-header";

export default function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070B1F] text-white">
      <SiteHeader activePath="/biblioteca" />
      {children}
    </div>
  );
}
