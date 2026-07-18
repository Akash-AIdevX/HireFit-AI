import { FileText, SearchCheck, Brain } from "lucide-react";

const features = [
  {
    title: "ATS Resume Score",
    description:
      "See how your resume performs against Applicant Tracking Systems.",
    icon: SearchCheck,
  },
  {
    title: "AI Suggestions",
    description: "Receive detailed improvements powered by AI.",
    icon: Brain,
  },
  {
    title: "Resume History",
    description:
      "Save every review and compare your improvements over time.",
    icon: FileText,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0a0a0f] py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-16 top-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-16 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
            Powerful Features
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Everything you need to improve
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
              your resume with confidence
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-2xl opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-white backdrop-blur-xl">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/60">
                    {feature.description}
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