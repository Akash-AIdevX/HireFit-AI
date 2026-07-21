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
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-gray-800">
      <h1 className="text-4xl font-bold text-gray-900">
        ATS Score
      </h1>
      <div className="text-7xl font-bold text-blue-600 mt-2">
        {data.ats_score}
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        Strengths
      </h2>
      <ul className="mt-3 space-y-2">
        {data.strengths.map((s: string) => (
          <li key={s} className="flex items-start gap-2 text-gray-700">
            <span className="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        Weaknesses
      </h2>
      <ul className="mt-3 space-y-2">
        {data.weaknesses.map((s: string) => (
          <li key={s} className="flex items-start gap-2 text-gray-700">
            <span className="text-red-600 font-bold flex-shrink-0">✘</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        Missing Keywords
      </h2>
      <div className="flex gap-3 flex-wrap mt-3">
        {data.missing_keywords.map((s: string) => (
          <span
            key={s}
            className="bg-red-100 text-red-800 rounded-full px-4 py-2 text-sm font-medium"
          >
            {s}
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        Suggestions
      </h2>
      <ul className="mt-3 space-y-2">
        {data.suggestions.map((s: string) => (
          <li key={s} className="flex items-start gap-2 text-gray-700">
            <span className="text-amber-500 font-bold flex-shrink-0">✴</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}