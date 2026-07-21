"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReview } from "@/lib/review";

export default function ReviewPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getReview(Number(params.id));
        setData(res);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) {
      load();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-medium text-slate-600 animate-pulse">
          Analyzing your resume...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-medium text-red-600">
          Failed to load review data.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header / Score Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              ATS Resume Review
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Here is a breakdown of how well your resume matches the target job description.
            </p>
          </div>
          <div className="flex flex-col items-center bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 min-w-[140px]">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              ATS Score
            </span>
            <span className="text-5xl font-extrabold text-blue-600 mt-1">
              {data.ats_score}
            </span>
          </div>
        </div>

        {/* Two Column Layout for Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span> Strengths
            </h2>
            <ul className="space-y-3">
              {data.strengths.map((s: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="text-green-500 shrink-0 mt-0.5">●</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">⚠</span> Areas for Improvement
            </h2>
            <ul className="space-y-3">
              {data.weaknesses.map((s: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="text-amber-500 shrink-0 mt-0.5">●</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Missing Keywords
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Adding these relevant terms to your resume can significantly improve your score.
          </p>
          <div className="flex gap-2 flex-wrap">
            {data.missing_keywords.map((s: string, index: number) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 border border-red-100 rounded-lg px-3 py-1.5 text-xs font-medium"
              >
                + {s}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Actionable Suggestions
          </h2>
          <ul className="space-y-4">
            {data.suggestions.map((s: string, index: number) => (
              <li key={index} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed">
                <span className="bg-blue-100 text-blue-700 rounded-md w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">
                  {index + 1}
                </span>
                <div>{s}</div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}