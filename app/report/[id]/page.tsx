import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function PublicReport({ params }: Props) {
  // 1. Debugging: Terminal mein check karo ki ID kya aa rahi hai
  console.log("DEBUG: Attempting to fetch ID:", params.id);

  const { data: report, error } = await supabase
    .from("leads")
    .select("*") 
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    console.error("SUPABASE ERROR:", error.message);
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono">
        <div className="text-center space-y-6">
          <div className="text-red-500 text-5xl font-black mb-2">404</div>
          <h1 className="text-xl font-bold text-zinc-400">Audit Not Found</h1>
          <div className="bg-zinc-900 p-4 rounded text-[10px] text-zinc-500 break-all">
            Requested ID: {params.id}
          </div>
          <Link href="/" className="inline-block text-green-500 border border-green-500/30 px-6 py-2 rounded-full text-sm">
            ← Go back to Auditor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 blur-[100px]" />
        
        <h1 className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black mb-6">Verified Audit Result</h1>
        
        <div className="text-7xl md:text-9xl font-black text-green-500 mb-4 tracking-tighter">
          ${report.savings}
        </div>
        
        <p className="text-zinc-400 mb-10 text-lg md:text-xl font-medium">
          Monthly recovery potential for <span className="text-white border-b border-zinc-700">{report.tool}</span>
        </p>
        
        <div className="bg-black/40 border border-zinc-800/50 p-6 rounded-2xl mb-12 text-left font-mono text-sm leading-relaxed">
          <p className="text-zinc-500 mb-2 font-bold uppercase text-[10px] tracking-widest">[ANALYSIS_REPORT]</p>
          <p className="text-zinc-300 italic">
            "Infrastructure optimization complete. Estimated annual recovery: 
            <span className="text-green-400 font-bold ml-1">${Number(report.savings) * 12}</span>."
          </p>
        </div>

        <Link href="/" className="inline-block bg-white hover:bg-green-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm transition-all">
          Audit My Own Spend →
        </Link>
      </div>
    </div>
  );
}