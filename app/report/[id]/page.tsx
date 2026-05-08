import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>; // Params ko Promise define karo
};

// --- 1. VIRAL OG TAGS (Server Side) ---
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
    description: "Audit your AI leakage in 30 seconds.",
    openGraph: {
      images: ["/og-image.png"],
    },
  };
}

// --- 2. PUBLIC REPORT PAGE ---
export default async function PublicReport({ params }: Props) {
  const { id } = await params; // 1. Params ko await karo

  // 2. Fresh fetch with no-cache logic
  const { data: report, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  // DEBUG: Agar error aaye toh UI par dikhega
  if (error || !report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-red-500 text-6xl font-black mb-4">404</h1>
        <p className="text-zinc-400">Audit record not found in database.</p>
        <div className="mt-4 p-2 bg-zinc-900 rounded text-[10px] text-zinc-600 font-mono">
          ID: {id}
        </div>
        <Link href="/" className="mt-8 text-green-500 hover:underline">← Restart Auditor</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full border border-zinc-800 bg-zinc-950/50 p-12 rounded-[3rem] text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 blur-[100px]" />
        
        <h1 className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black mb-6">Verified Audit Result</h1>
        <div className="text-8xl font-black text-green-500 mb-4 tracking-tighter">${report.savings}</div>
        <p className="text-zinc-400 mb-10 text-xl font-medium">Monthly recovery for <span className="text-white border-b border-zinc-700">{report.tool}</span></p>
        
        <div className="bg-black/40 border border-zinc-800/50 p-6 rounded-2xl mb-12 text-left font-mono text-sm">
          <p className="text-zinc-500 mb-2 font-bold">[ANALYSIS]</p>
          <p className="text-zinc-300 italic">"Infrastructure optimization complete. Annual recovery: ${report.savings * 12}."</p>
        </div>

        <Link href="/" className="inline-block bg-white hover:bg-green-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm transition-all">
          Audit My Own Spend — Free →
        </Link>
      </div>
    </div>
  );
}