import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-6xl font-black tracking-tighter text-black">
        Stop Overpaying for <span className="text-blue-600">AI Tools</span>
      </h1>
      <p className="mt-4 text-zinc-500 max-w-xl text-lg">
        Audit your ChatGPT, Claude, and Gemini spend in 60 seconds.
      </p>
      <Link href="/audit" className="mt-8 px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
        Start Free Audit →
      </Link>
    </div>
  );
}