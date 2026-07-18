"use client";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0fbe] backdrop-blur-2xl select-none"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      <div className="relative overflow-hidden px-8 py-5">
        {/* Ambient glow matching your master cluster theme */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-0 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />
          <div className="absolute right-20 top-0 h-20 w-20 rounded-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.01))]" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          {/* Workspace Path Meta Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
              Workspace
            </p>
            <h1 className="mt-1 text-[22px] font-bold tracking-[-0.03em] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>

          {/* User Info & State Metadata */}
          <div className="flex items-center gap-4">
            {/* Dynamic Plan Tier Badge */}
            <Badge className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase text-cyan-400 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
              {user?.plan ?? "Free"}
            </Badge>

            <div className="h-8 w-px bg-white/10" />

            {/* Premium Profile Glass Container */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2 backdrop-blur-xl shadow-lg hover:border-white/20 transition-all duration-300">
              <p className="text-[14px] font-semibold text-white/90 tracking-wide">
                {user?.full_name ?? "Guest User"}
              </p>
              <p className="text-[12px] font-mono text-white/40 mt-0.5">
                {user?.email ?? "guest@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}