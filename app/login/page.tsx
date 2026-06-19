import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

type PageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse sua conta para continuar criando áudios profissionais."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-blue-400 hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <LoginForm redirectTo={params.redirect ?? "/dashboard"} />
    </AuthShell>
  );
}
