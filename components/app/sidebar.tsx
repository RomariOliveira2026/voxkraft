"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { NavIcon } from "@/components/app/nav-icon";
import { appNavItems } from "@/lib/navigation";

import { signOut } from "@/lib/actions/auth";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function Sidebar({
  userName,
  userInitials,
  planLabel,
}: {
  userName: string;
  userInitials: string;
  planLabel: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      <div className="flex h-14 items-center border-b border-white/10 px-5">
        <Logo
          variant="horizontal"
          href="/dashboard"
          imageClassName="h-7 w-auto md:h-8"
          onClick={() => setMobileOpen(false)}
        />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {appNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <NavIcon
                name={item.icon}
                className={`h-5 w-5 shrink-0 ${active ? "text-blue-400" : ""}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-sm font-bold text-blue-300">
            {userInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="truncate text-xs text-slate-400">{planLabel}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-3 w-full rounded-xl px-3 py-2 text-center text-xs text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
          >
            Sair
          </button>
        </form>
        <Link
          href="/"
          className="mt-2 block rounded-xl px-3 py-2 text-center text-xs text-slate-500 transition hover:text-slate-300"
        >
          Voltar ao site
        </Link>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0B102A] text-slate-300 lg:hidden"
        aria-label="Abrir menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0B102A] transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
