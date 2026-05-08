import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col items-center overflow-hidden font-sans">
      
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Subtle fade at edges */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_100%)]" />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 text-center pt-28 pb-20 flex-grow flex flex-col items-center justify-center">
        
        {/* Pill Badge — Credex style */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            SYSTEM Q2 2026 READY
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[1.05]">
          Stop Overpaying for{" "}
          <br />
          <span
            className="font-extrabold"
            style={{ color: "#16a34a" }} // Credex green
          >
            AI Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          The average team wastes{" "}
          <span className="text-zinc-900 font-semibold">$200/mo</span> on
          unused AI seats and inefficient plans. Get a professional audit in{" "}
          <span className="text-zinc-900 font-semibold">60 seconds</span>.
        </p>

        {/* CTA Buttons — Credex style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/audit">
            <button className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shadow-md">
              Start Your Free Audit →
            </button>
          </Link>
          <button className="px-10 py-4 bg-white text-zinc-600 border border-zinc-200 rounded-2xl font-bold text-lg hover:border-zinc-400 hover:text-zinc-900 transition-all duration-200 shadow-sm">
            See Example Report
          </button>
        </div>

        {/* Trust Strip — Credex style scrolling bar */}
        <div className="mt-20 w-screen relative overflow-hidden border-t border-b border-zinc-100 py-3 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
            {[
              "Ownership auditing",
              "Escrow style checks",
              "24×7 support",
              "Guarantee",
              "Transfer ≤ 24h post-payment",
              "Verified vendors",
              "Ownership auditing",
              "Escrow style checks",
              "24×7 support",
              "Guarantee",
              "Transfer ≤ 24h post-payment",
              "Verified vendors",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600"
              >
                <svg
                  className="w-4 h-4 text-green-500 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1500px] mx-auto py-8 px-6 text-center text-zinc-400 text-sm border-t border-zinc-100">
        © 2026 SpendsAudit AI. Audit performed locally on-device.
      </footer>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}