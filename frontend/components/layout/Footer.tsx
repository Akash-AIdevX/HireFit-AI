export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0f] py-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm tracking-wide text-white/45">
          Engineered by <span className="text-white/75">Akash</span>.
        </p>
      </div>
    </footer>
  );
}