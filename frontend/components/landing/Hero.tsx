import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0f] py-32 text-white"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.20),rgba(191,90,242,0.14)_45%,transparent_72%)] blur-[110px]" />
        <div className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-80px] top-32 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02))]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Glass badge */}
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
          AI-Powered Resume Optimization
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Land more interviews.
          <br />
          <span className="bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
            Effortlessly.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
          Upload your resume, paste any job description, and get an ATS score,
          keyword analysis, and tailored improvements in seconds.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button
              size="lg"
              className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] px-8 py-6 text-base font-medium text-white shadow-[0_10px_40px_rgba(90,120,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(120,90,255,0.45)] active:scale-95"
            >
              Start Free
            </Button>
          </Link>

          <Link href="#pricing">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border border-white/15 bg-white/8 px-8 py-6 text-base font-medium text-white backdrop-blur-2xl transition-all duration-300 hover:bg-white/12 hover:text-white active:scale-95"
            >
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Optional glass feature strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {[
            "Instant ATS Score",
            "Keyword Match Analysis",
            "Tailored Resume Suggestions",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}