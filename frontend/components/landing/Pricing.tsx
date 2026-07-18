"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#0a0a0f] py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
            Pricing
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Simple plans for every
            <span className="ml-2 bg-gradient-to-r from-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
              job seeker
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Free */}

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Starter
            </p>

            <h3 className="mt-3 text-3xl font-semibold">
              Free
            </h3>

            <p className="mt-6 text-5xl font-bold">
              ₹0
            </p>

            <p className="mt-2 text-sm text-white/45">
              Perfect for getting started
            </p>

            <ul className="mt-8 space-y-4 text-white/70">
              <li>✔ 3 Resume Reviews</li>
              <li>✔ ATS Score</li>
              <li>✔ AI Suggestions</li>
            </ul>

            <Link href="/signup">

              <Button className="mt-8 w-full rounded-full bg-white/10">

                Start Free

              </Button>

            </Link>

          </div>

          {/* Pro */}

          <div className="rounded-[28px] border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-2xl">

            <div className="rounded-full bg-cyan-500/10 inline-block px-3 py-1 text-xs">

              Most Popular

            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">
              Premium
            </p>

            <h3 className="mt-3 text-3xl font-semibold">
              Pro
            </h3>

            <p className="mt-6 text-5xl font-bold">
              ₹199
            </p>

            <p className="mt-2 text-sm text-white/45">
              per month
            </p>

            <ul className="mt-8 space-y-4 text-white/70">
              <li>✔ Unlimited Resume Reviews</li>
              <li>✔ AI Improvements</li>
              <li>✔ Resume History</li>
              <li>✔ Export PDF</li>
            </ul>

            <Link href="/login">

              <Button className="mt-8 w-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2]">

                Get Started

              </Button>

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}