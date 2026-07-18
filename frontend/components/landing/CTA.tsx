import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/8 px-10 py-20 text-center shadow-[0_12px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.08),transparent,rgba(255,255,255,0.03))]" />
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
              Get Started Today
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Ready to Land Your
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Join thousands of professionals using AI to improve their resumes
              and increase interview callbacks.
            </p>

            <Link href="/signup">
              <Button
                size="lg"
                className="mt-10 rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] px-10 py-6 text-base font-medium text-white shadow-[0_10px_40px_rgba(90,120,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(120,90,255,0.45)] active:scale-95"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}