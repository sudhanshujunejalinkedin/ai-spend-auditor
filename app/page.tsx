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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_100%)]" />

      {/* ───── HERO ───── */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-28 pb-16 sm:pb-20 flex flex-col items-center justify-center">

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 sm:mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-500">
            REDUCE AI TOOL SPEND
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 mb-5 sm:mb-6 leading-[1.05]">
          Stop Overpaying for{" "}
          <br className="hidden sm:block" />
          <span className="font-extrabold" style={{ color: "#16a34a" }}>
            AI Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-500 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
          The average team wastes{" "}
          <span className="text-zinc-900 font-semibold">$200/mo</span> on
          unused AI seats and inefficient plans. Get a professional audit in{" "}
          <span className="text-zinc-900 font-semibold">60 seconds</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
          <Link href="/audit" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-zinc-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shadow-md">
              Start Your Free Audit →
            </button>
          </Link>
          <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-white text-zinc-600 border border-zinc-200 rounded-2xl font-bold text-base sm:text-lg hover:border-zinc-400 hover:text-zinc-900 transition-all duration-200 shadow-sm">
            See Example Report
          </button>
        </div>

        {/* Trust Strip */}
        <div className="mt-16 sm:mt-20 w-screen relative overflow-hidden border-t border-b border-zinc-100 py-3 bg-white/80 backdrop-blur-sm">
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
                <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* ───── HOW IT WORKS ───── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3 block">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900">
            Audit in 3 Easy Steps
          </h2>
          <p className="mt-4 text-zinc-500 text-base sm:text-lg max-w-xl mx-auto">
            No credit card. No installs. Just answers in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-10 left-[20%] right-[20%] h-px bg-zinc-200 -z-0" />

          {[
            {
              step: "01",
              title: "Enter Your Tools",
              desc: "List the AI tools your team currently pays for — ChatGPT, Copilot, Midjourney, and more.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
            {
              step: "02",
              title: "We Analyze Usage",
              desc: "Our engine checks overlap, underutilisation, and cheaper alternatives across 80+ AI products.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              step: "03",
              title: "Get Your Report",
              desc: "Download a detailed savings report with exact steps to cut costs — instantly.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
          ].map(({ step, title, desc, icon }) => (
            <div key={step} className="relative flex flex-col items-center text-center bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 z-10">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-4 shadow-md">
                {icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">{step}</span>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{title}</h3>
              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="w-full bg-zinc-950 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3 block">What You Get</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
              Everything You Need to Save
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Seat Overlap Detection",
                desc: "Find tools doing the same job. Consolidate and cut redundant subscriptions instantly.",
                badge: "Most Popular",
              },
              {
                title: "Per-Seat Cost Breakdown",
                desc: "See exactly how much each AI seat costs per employee per month, with benchmarks.",
                badge: null,
              },
              {
                title: "Cheaper Alternatives",
                desc: "We surface verified cheaper alternatives for 80+ tools with feature parity scores.",
                badge: "New",
              },
              {
                title: "Unused Seat Alerts",
                desc: "Identify seats that haven't been used in 30+ days — stop paying for ghost users.",
                badge: null,
              },
              {
                title: "Annual vs Monthly Savings",
                desc: "Calculate exact savings from switching to annual billing across your entire stack.",
                badge: null,
              },
              {
                title: "PDF Export Report",
                desc: "Share a clean, professional audit PDF with your finance team or leadership.",
                badge: null,
              },
            ].map(({ title, desc, badge }) => (
              <div key={title} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-300 group">
                {badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {badge}
                  </span>
                )}
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SOCIAL PROOF / TESTIMONIALS ───── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3 block">Real Results</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900">
            Teams Love SpendsAudit
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {[
            {
              quote: "Found 4 overlapping tools in minutes. Saved us $340/mo on day one. Literally paid for itself before we even paid for anything.",
              name: "Arjun Mehta",
              role: "CTO, Stackly",
              savings: "$340/mo saved",
            },
            {
              quote: "The seat overlap detection alone is worth it. We had 3 tools doing the same thing and had no idea.",
              name: "Priya Sharma",
              role: "Head of Ops, Nuvio",
              savings: "$190/mo saved",
            },
            {
              quote: "Clean report, instant insights. I sent the PDF to our CFO and we approved cuts the same day.",
              name: "Daniel Torres",
              role: "Product Lead, Forgekit",
              savings: "$520/mo saved",
            },
          ].map(({ quote, name, role, savings }) => (
            <div key={name} className="bg-white border border-zinc-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed flex-1">"{quote}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <div>
                  <p className="font-bold text-zinc-900 text-sm">{name}</p>
                  <p className="text-zinc-400 text-xs">{role}</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                  {savings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "4,200+", label: "Audits Completed" },
            { value: "$1.2M", label: "Total Savings Found" },
            { value: "60s", label: "Average Audit Time" },
            { value: "98%", label: "User Satisfaction" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center bg-zinc-50 border border-zinc-100 rounded-2xl p-5 sm:p-6">
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-zinc-900 mb-1" style={{ color: "#16a34a" }}>{value}</p>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="bg-zinc-900 rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden">
          {/* BG glow */}
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(22,163,74,0.15)_0%,transparent_100%)] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-4 relative z-10">
            Ready to Stop the Bleed?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-lg mx-auto relative z-10">
            Join 4,200+ teams who found hidden savings in under a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center relative z-10">
            <Link href="/audit" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-base sm:text-lg hover:bg-zinc-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shadow-md">
                Start Free Audit →
              </button>
            </Link>
            <p className="text-zinc-500 text-sm">No signup required · 100% free</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 text-center text-zinc-400 text-sm border-t border-zinc-100">
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