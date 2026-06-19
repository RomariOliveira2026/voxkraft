import { Sidebar } from "@/components/app/sidebar";

type AppShellProps = {
  children: React.ReactNode;
  userName: string;
  userInitials: string;
  planLabel: string;
};

export function AppShell({
  children,
  userName,
  userInitials,
  planLabel,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#070B1F] text-white">
      <Sidebar
        userName={userName}
        userInitials={userInitials}
        planLabel={planLabel}
      />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <main className="flex-1 overflow-y-auto px-4 pb-8 pt-16 lg:px-8 lg:pt-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
