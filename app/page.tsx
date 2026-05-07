import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white flex flex-col items-center overflow-hidden font-sans">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_10%,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />

      {/* Header - Consistent with Audit Engine */}
      

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 text-center pt-24 pb-16 flex-grow flex flex-col items-center justify-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-10 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">SYSTEM Q2 2026 READY</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[1.05]">
          Stop Overpaying for <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-xy">
            AI Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-14 max-w-3xl mx-auto leading-relaxed">
          The average team wastes <span className="text-white font-semibold">$200/mo</span> on unused AI seats and inefficient plans. Get a professional audit in <span className="text-white font-semibold">60 seconds</span>.
        </p>

        {/* Dynamic Button Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/audit">
            <button className="px-12 py-5 bg-white text-zinc-950 rounded-2xl font-extrabold text-xl hover:bg-zinc-200 hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300 active:scale-95 shadow-xl shadow-zinc-950/50">
              Start Your Free Audit →
            </button>
          </Link>
          <button className="px-12 py-5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-2xl font-extrabold text-xl hover:bg-zinc-800 hover:text-white transition-all duration-200">
            See Example Report
          </button>
        </div>

        {/* Partner Logos - Dark Mode Optimized */}
       
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1500px] mx-auto py-10 px-6 text-center text-zinc-600 text-sm border-t border-zinc-800/50">
        © 2026 SpendsAudit AI. Audit performed locally on-device.
      </footer>
    </div>
  );
}