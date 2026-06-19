import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function CadastroPage() {
  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece gratuitamente e transforme textos em vozes profissionais."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link href="/login" className="font-medium text-blue-400 hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
