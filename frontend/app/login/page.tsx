import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 text-white"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,132,255,0.28),rgba(191,90,242,0.22)_45%,transparent_72%)] blur-[110px]" />
        <div className="absolute left-[-80px] top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-80px] top-28 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
      </div>

      {/* Dark glass card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent"
        />

        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-white/55">
            Log in to continue.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-white/45">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-300 transition hover:text-fuchsia-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}