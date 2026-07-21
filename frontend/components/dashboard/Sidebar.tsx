"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resume Reviews",
    href: "https://hire-fit-ai-wine.vercel.app/dashboard/history",
    icon: FileText,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 flex h-screen w-72 shrink-0 overflow-hidden border-r border-white/10 bg-[#0a0a0fbe] p-6 backdrop-blur-2xl select-none"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {/* Ambient cluster background to match main viewport theme */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
        {/* Adjusted bottom glow coordinate anchor */}
        <div className="absolute bottom-0 left-4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_25%,transparent_75%,rgba(255,255,255,0.01))]" />
      </div>

      <div className="relative z-10 flex w-full flex-col h-full justify-between">
        {/* Top Section: Brand & Navigation Links */}
        <div className="flex flex-col flex-1">
          {/* Brand Container */}
          <div className="mb-10">
            <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl">
              <div className="mr-3 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-pulse" />
              <h2 className="bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-xl font-bold tracking-[-0.03em] text-transparent">
                HireFit AI
              </h2>
            </div>
          </div>

          {/* Action Controlled Navigation Grid */}
          <nav className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition-all duration-300 border ${
                    isActive
                      ? "border-white/15 bg-white/[0.06] text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                      : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {/* Active Underlay Ambient Accent */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 via-transparent to-fuchsia-400/5 pointer-events-none" />
                  )}

                  {/* Micro-Icon Frame */}
                  <span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "border-white/20 bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                        : "border-white/5 bg-white/5 text-white/60 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white/90"
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.3 : 1.9} />
                  </span>

                  <span className="relative tracking-wide">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Fixed System Flow Banner */}
        <div className="pt-6 mt-auto">
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 shadow-xl">
            {/* Ambient banner reflections */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-fuchsia-500/10 blur-2xl group-hover:bg-fuchsia-500/20 transition-all duration-500" />
            <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl group-hover:bg-cyan-400/20 transition-all duration-500" />

            <div className="relative z-10 flex flex-col">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-wider">
                  System Flow
                </p>
              </div>
              <p className="text-sm font-semibold text-white/90">
                Upgrade your resume workflow
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/40">
                Review resumes faster with a clean AI-powered dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}