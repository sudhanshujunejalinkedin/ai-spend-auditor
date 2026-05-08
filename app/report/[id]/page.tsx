import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

// OG Tags for Viral Preview
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await supabase.from("leads").select("*").eq("id", params.id).single();
  
  const savings = data?.savings || 0;
  const tool = data?.tool || "AI Tools";

  return {
    title: `I found $${savings}/mo savings on ${tool}!`,
    description: "Audit your AI spend in 30 seconds with SpendsAudit AI.",
    openGraph: {
      title: `Audit Result: $${savings * 12} Annual Recovery`,
      description: `Optimizing ${tool} deployment. Check your AI leakage now.`,
      images: ["/og-image.png"], // Tera logo ya banner
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Spend Audit: $${savings} Monthly Savings`,
      site: "@yourhandle",
    },
  };
}

export default async function PublicReport({ params }: { params: { id: string } }) {
  const { data: report, error } = await supabase.from("leads").select("tool, savings, company_data").eq("id", params.id).single();

  if (error || !report) return <div className="p-20 text-center">Audit not found or deleted.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full border border-green-900/30 bg-zinc-900/50 p-10 rounded-3xl text-center">
        <h1 className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Public Audit Result</h1>
        <div className="text-8xl font-black text-green-500 mb-2">${report.savings}</div>
        <p className="text-zinc-400 mb-8 text-xl">Monthly recovery identified for <strong>{report.tool}</strong></p>
        
        <div className="bg-zinc-800/50 p-6 rounded-xl mb-10 text-left">
          <p className="text-zinc-300 italic">"This infrastructure is now optimized for efficiency."</p>
        </div>

        <a href="/" className="bg-green-600 hover:bg-green-500 text-black px-8 py-4 rounded-full font-bold transition-all">
          Audit My Own Spend →
        </a>
      </div>
    </div>
  );
}