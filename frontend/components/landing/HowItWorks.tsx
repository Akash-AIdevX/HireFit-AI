import { Upload, FileSearch, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Upload Resume",
    description: "Upload your resume in PDF format securely.",
    icon: Upload,
  },
  {
    title: "Paste Job Description",
    description: "Paste the job description you're applying for.",
    icon: FileSearch,
  },
  {
    title: "Receive AI Feedback",
    description:
      "Get ATS scoring, keyword analysis, and improvement suggestions instantly.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-16 top-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
            How It Works
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Optimize your resume in
            <span className="ml-2 bg-gradient-to-r from-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>

          <p className="mt-4 text-lg text-white/60">
            Fast, simple, and designed to help you land more interviews.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-2xl opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-white backdrop-blur-xl">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                    Step {index + 1}
                  </span>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/60">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}