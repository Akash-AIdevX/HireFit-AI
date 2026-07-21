"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReview } from "@/lib/review";

export default function ReviewPage() {
  const params = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getReview(Number(params.id));
    setData(res);
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 tracking-tight">
      
      {/* Header & Score Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-8 mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            ATS Score Analysis
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Detailed performance review and keyword optimization report.
          </p>
        </div>
        <div className="text-7xl font-black text-blue-600 md:text-right">
          {data.ats_score}
        </div>
      </div>

      {/* Main Grid: Strengths & Weaknesses side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
            <span className="text-green-600">✓</span> Strengths
          </h2>
          <ul className="space-y-3">
            {data.strengths.map((s: string) => (
              <li key={s} className="text-gray-700 leading-relaxed text-sm pl-1">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2">
            <span className="text-red-500">✘</span> Weaknesses
          </h2>
          <ul className="space-y-3">
            {data.weaknesses.map((s: string) => (
              <li key={s} className="text-gray-700 leading-relaxed text-sm pl-1">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Keywords Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold border-b pb-2 mb-4">
          Missing Keywords
        </h2>
        <div className="flex gap-2 flex-wrap pt-2">
          {data.missing_keywords.map((s: string) => (
            <span
              key={s}
              className="bg-red-50 text-red-700 border border-red-200 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Suggestions Section */}
      <div>
        <h2 className="text-xl font-bold border-b pb-2 mb-4">
          Suggestions
        </h2>
        <ul className="space-y-4">
          {data.suggestions.map((s: string) => (
            <li key={s} className="text-gray-700 leading-relaxed text-sm flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5">▪</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}