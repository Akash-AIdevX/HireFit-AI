"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

type Review = {
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  suggestions: string[];
};

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const params = useSearchParams();

  const review: Review = useMemo(() => {
    try {
      const raw = params.get("review");
      if (!raw) {
        return {
          ats_score: 0,
          strengths: [],
          weaknesses: [],
          missing_keywords: [],
          suggestions: [],
        };
      }
      return JSON.parse(raw);
    } catch {
      return {
        ats_score: 0,
        strengths: [],
        weaknesses: [],
        missing_keywords: [],
        suggestions: [],
      };
    }
  }, [params]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0fbe] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.02))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm text-white/70 backdrop-blur-xl">
            AI Resume Review
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Resume Analysis
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            A polished ATS review dashboard with strengths, weaknesses, missing
            keywords, and actionable suggestions.
          </p>
        </div>

        {/* Score card */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-2xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-medium text-white/80 md:text-3xl">
                ATS Score
              </h2>
              <p className="mt-3 text-sm text-white/50">
                Your resume compatibility snapshot
              </p>
            </div>

            <div className="flex items-end gap-2">
              <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-7xl font-bold tracking-tight text-transparent md:text-8xl">
                {review.ats_score}
              </span>
              <span className="mb-3 text-2xl text-white/60">%</span>
            </div>
          </div>
        </section>

        {/* Strengths / Weaknesses */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard title="Strengths" icon="✦">
            <ul className="mt-5 space-y-3">
              {review.strengths.length > 0 ? (
                review.strengths.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 transition hover:bg-white/10"
                  >
                    <span className="mr-2 text-emerald-400">✓</span>
                    {item}
                  </li>
                ))
              ) : (
                <EmptyState text="No strengths available." />
              )}
            </ul>
          </GlassCard>

          <GlassCard title="Weaknesses" icon="•">
            <ul className="mt-5 space-y-3">
              {review.weaknesses.length > 0 ? (
                review.weaknesses.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 transition hover:bg-white/10"
                  >
                    <span className="mr-2 text-rose-400">✘</span>
                    {item}
                  </li>
                ))
              ) : (
                <EmptyState text="No weaknesses available." />
              )}
            </ul>
          </GlassCard>
        </section>

        {/* Missing keywords */}
        <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Missing Keywords
            </h2>
            <div className="rounded-full border border-red-300/20 bg-red-400/10 px-3 py-1 text-sm text-red-200">
              Improve ATS Match
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {review.missing_keywords.length > 0 ? (
              review.missing_keywords.map((item: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-100 backdrop-blur-xl transition hover:scale-[1.03] hover:bg-red-400/15"
                >
                  {item}
                </span>
              ))
            ) : (
              <EmptyState text="No missing keywords found." />
            )}
          </div>
        </section>

        {/* Suggestions */}
        <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">Suggestions</h2>

          <ul className="mt-5 grid gap-4">
            {review.suggestions.length > 0 ? (
              review.suggestions.map((item: string, index: number) => (
                <li
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 transition duration-300 hover:bg-white/10 hover:shadow-lg"
                >
                  <span className="mr-2 text-cyan-300">💡</span>
                  {item}
                </li>
              ))
            ) : (
              <EmptyState text="No suggestions available." />
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}

function GlassCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/12">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-black/80 backdrop-blur-xl">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-white/40">
      {text}
    </div>
  );
}