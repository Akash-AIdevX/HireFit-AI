"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { token, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div
          className="relative flex h-16 items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
          }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-0 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="absolute right-10 top-0 h-16 w-16 rounded-full bg-fuchsia-500/10 blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04),transparent,rgba(255,255,255,0.03))]" />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="relative bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-xl font-semibold tracking-[-0.03em] text-transparent transition-opacity hover:opacity-90"
          >
            HireFit AI
          </Link>

          {/* Navigation */}
          <nav className="relative hidden items-center gap-8 md:flex">
            {[
              ["Features", "#features"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group relative text-sm font-medium text-white/60 transition-colors duration-300 hover:text-white"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-300 to-fuchsia-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="relative flex items-center gap-3">
            {token ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white hover:bg-white/10"
                  >
                    Dashboard
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] px-5 text-white shadow-[0_8px_24px_rgba(90,120,255,0.28)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full border border-white/10 bg-white/5 px-5 text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] px-6 text-white shadow-[0_8px_24px_rgba(90,120,255,0.28)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}