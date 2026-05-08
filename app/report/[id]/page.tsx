import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

// --- 1. VIRAL OG TAGS (Twitter/LinkedIn Preview) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("leads")
    .select("tool, savings")
    .eq("id", id)
    .maybeSingle();

  const savings = data?.savings || 0;
  const tool = data?.tool || "AI Tools";

  return {
    title: `I saved $${savings}/mo on ${tool}!`,
    description: "Audit your AI leakage in 30 seconds with SpendsAudit.",
    openGraph: {
      title: `AI Spend Audit: $${savings}/mo Saved`,
      description: `Check how I optimized my ${tool} costs.`,
      type: "website",
      images: [
        {
          url: "https://ai-spend-auditor.vercel.app/og-image.png", // Apna real domain use karein
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `I saved $${savings}/mo on ${tool}!`,
      description: "Audit your AI leakage in 30 seconds.",
      images: ["https://ai-spend-auditor.vercel.app/og-image.png"],
    },
  };
}

// --- 2. PUBLIC REPORT PAGE (LIGHT MODE) ---
export default async function PublicReport({ params }: Props) {
  const { id } = await params;

  const { data: report, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-red-500 text-6xl font-black mb-4">404</h1>
        <p className="text-zinc-500 font-medium">Audit record not found.</p>
        <Link href="/" className="mt-8 text-zinc-900 underline font-bold">← Back to Safety</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 p-6 flex flex-col items-center justify-center font-sans">
      {/* Container */}
      <div className="max-w-xl w-full bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 p-10 md:p-14 rounded-[2.5rem] text-center relative overflow-hidden">
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-100 blur-[80px] opacity-60" />
        
        <h2 className="text-zinc-400 uppercase tracking-[0.25em] text-[11px] font-bold mb-8">Official Audit Report</h2>
        
        <div className="text-7xl md:text-8xl font-black text-zinc-900 mb-2 tracking-tighter">
          ${report.savings}<span className="text-2xl text-zinc-400 font-medium ml-1">/mo</span>
        </div>
        
        <p className="text-zinc-500 mb-12 text-lg font-medium">
          Identified recovery for <span className="text-zinc-900 font-bold px-2 py-1 bg-zinc-100 rounded-lg">{report.tool}</span>
        </p>
        
        <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl mb-12 text-left shadow-inner">
          <p className="text-zinc-400 mb-3 font-bold text-[10px] tracking-widest uppercase">[System Analysis]</p>
          <p className="text-zinc-700 leading-relaxed font-medium">
            "We detected sub-optimal seat allocation. By implementing these changes, you can recover 
            <span className="text-green-600 font-bold"> ${report.savings * 12} annually</span>."
          </p>
        </div>

        <Link href="/" className="group relative inline-flex items-center justify-center bg-zinc-900 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold uppercase text-sm transition-all duration-300 w-full shadow-lg shadow-zinc-300 hover:shadow-green-200">
          Audit My Own Spend — Free
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        
        <p className="mt-8 text-zinc-400 text-[10px] font-medium tracking-tight">
          SpendsAudit AI • Powered by Groq & Supabase
        </p>
      </div>
    </div>
  );
}