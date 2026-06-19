export function SetupRequired() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
        Configuração necessária
      </p>
      <h2 className="mt-4 text-2xl font-black">Conecte o Supabase para continuar</h2>
      <p className="mt-3 max-w-lg text-slate-300">
        Crie o arquivo <code className="text-amber-200">.env.local</code> na pasta{" "}
        <code className="text-amber-200">voxkraft-app</code> com suas credenciais do Supabase.
      </p>
      <ol className="mt-6 max-w-lg space-y-2 text-left text-sm text-slate-400">
        <li>1. Copie <code>.env.example</code> para <code>.env.local</code></li>
        <li>
          2. Preencha{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        </li>
        <li>
          3. Execute o SQL em{" "}
          <code>supabase/migrations/001_initial_schema.sql</code>
        </li>
        <li>4. Reinicie o servidor com <code>npm run dev</code></li>
      </ol>
      <a
        href="https://supabase.com/dashboard/project/_/settings/api"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500"
      >
        Abrir painel do Supabase
      </a>
    </div>
  );
}
