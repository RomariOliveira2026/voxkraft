import { Logo } from "@/components/brand/logo";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-screen bg-[#070B1F] text-white">
      <div className="hidden w-1/2 flex-col justify-between border-r border-white/10 bg-[#020B3A] p-12 lg:flex">
        <Logo variant="horizontal" href="/" imageClassName="h-12 w-auto md:h-14" />

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
            Inteligência artificial
          </p>
          <h1 className="mt-4 max-w-md text-4xl font-black leading-tight">
            A revolução brasileira da voz com IA.
          </h1>
          <p className="mt-4 max-w-sm text-slate-400">
            Crie narrações profissionais em segundos com vozes brasileiras
            naturais e de alta qualidade.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} VoxKraft. Todos os direitos reservados.
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mb-10 lg:hidden">
          <Logo variant="horizontal" href="/" imageClassName="h-10 w-auto" />
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-black tracking-tight">{title}</h2>
          <p className="mt-2 text-slate-400">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-slate-400">{footer}</p>
        </div>
      </div>
    </div>
  );
}
