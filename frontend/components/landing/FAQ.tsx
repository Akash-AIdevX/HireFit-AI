"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the ATS score?",
    answer:
      "The score is calculated by comparing your resume with the job description, checking keyword coverage, formatting, readability, and ATS compatibility.",
  },
  {
    question: "Can I review multiple resumes?",
    answer:
      "Yes. Free users can review 3 resumes per day. Pro users get unlimited reviews.",
  },
  {
    question: "Will my resume be stored?",
    answer:
      "Yes. Your reviews are securely stored so you can revisit them anytime from your dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#0a0a0f] py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-20 top-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-20 top-20 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
            FAQ
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Frequently Asked
            <span className="ml-2 bg-gradient-to-r from-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold tracking-[-0.02em] text-white">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-white/10" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 text-white/70" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-70"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-white/60 leading-7">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}