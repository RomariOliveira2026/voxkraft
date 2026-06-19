import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function RecuperarSenhaPage() {
  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Enviaremos um link para redefinir sua senha por e-mail."
      footer={
        <>
          Lembrou a senha?{" "}
          <Link href="/login" className="font-medium text-blue-400 hover:underline">
            Voltar ao login
          </Link>
        </>
      }
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
