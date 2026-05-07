import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      
      <main className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-sm font-medium text-blue-700">Audit your SaaS spend instantly</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
          Stop Overpaying for <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Tools
          </span>
        </h1>

        <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          The average team wastes $200/mo on unused AI seats. 
          Get a professional audit and optimize your stack in 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/audit">
            <button className="px-8 py-4 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Start Free Audit →
            </button>
          </Link>
          <button className="px-8 py-4 bg-white text-zinc-600 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition-all">
            See Example Report
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 opacity-40 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" className="h-8 mx-auto" alt="ChatGPT" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Gemini_logo.svg/1200px-Google_Gemini_logo.svg.png" className="h-8 mx-auto" alt="Gemini" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Anthropic_logo.svg" className="h-6 mx-auto" alt="Claude" />
        </div>
      </main>
    </div>
  );
}