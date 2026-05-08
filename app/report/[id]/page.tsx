import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
};

// --- 1. VIRAL OG TAGS GENERATION ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase
    .from("leads")
    .select("tool, savings")
    .eq("id", params.id)
    .single();

  const savings = data?.savings || 0;
  const tool = data?.tool || "AI Tools";
  const annualSavings = savings * 12;

  return {
    title: `I found $${savings}/mo savings on ${tool}!`,
    description: "Audit your AI spend in 30 seconds with SpendsAudit AI.",
    openGraph: {
      title: `Audit Result: $${annualSavings} Annual Recovery`,
      description: `Optimizing ${tool} deployment. Check your AI leakage now.`,
      url: `https://ai-spend-auditor.vercel.app/report/${params.id}`,
      siteName: "SpendsAudit AI",
      images: [
        {
          url: "/og-image.png", // Make sure this exists in your public folder
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Spend Audit: $${savings} Monthly Savings`,
      description: `I'm saving $${annualSavings} yearly. Audit yours!`,
      images: ["/og-image.png"],
    },
  };
}

// --- 2. PUBLIC REPORT PAGE ---
export default async function PublicReport({ params }: Props) {
  const { data: report, error } = await supabase
    .from("leads")
    .select("tool, savings")
    .eq("id", params.id)
    .single();

  // Error state if ID is wrong or RLS is blocking
  if (error || !report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-zinc-500">Audit not found or deleted.</h1>
          <Link href="/" className="text-green-500 hover:underline">← Go back to Auditor</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 blur-[100px]" />
        
        <h1 className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black mb-6">
          Verified Audit Result
        </h1>
        
        <div className="text-7xl md:text-9xl font-black text-green-500 mb-4 tracking-tighter">
          ${report.savings}
        </div>
        
        <p className="text-zinc-400 mb-10 text-lg md:text-xl font-medium">
          Monthly recovery potential identified for <span className="text-white border-b border-zinc-700">{report.tool}</span>
        </p>
        
        <div className="bg-black/40 border border-zinc-800/50 p-6 rounded-2xl mb-12 text-left font-mono text-sm leading-relaxed">
          <p className="text-zinc-500 mb-2 font-bold uppercase text-[10px] tracking-widest">[ANALYSIS_REPORT]</p>
          <p className="text-zinc-300 italic">
            "Infrastructure detected as sub-optimal. Implementing recommended seat-mapping and tier-adjustments could recover 
            <span className="text-green-400 font-bold ml-1">${report.savings * 12} annually</span>."
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-block bg-white hover:bg-green-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm tracking-tighter transition-all hover:scale-105 active:scale-95"
        >
          Audit My Own Spend — Free →
        </Link>
        
        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
          SpendsAudit AI v2.0 • Data Sovereign
        </p>
      </div>
    </div>
  );
}