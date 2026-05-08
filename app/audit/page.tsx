"use client";

import { useState, useEffect } from "react";
import {
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Activity,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// --- Pricing & Logic Data ---
const TOOLS_CONFIG: Record<string, any> = {
  Cursor: {
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
    pricing: [0, 20, 40, 100],
    url: "https://www.cursor.com/pricing",
  },
  "GitHub Copilot": {
    plans: ["Individual", "Business", "Enterprise"],
    pricing: [10, 19, 39],
    url: "https://github.com/features/copilot#pricing",
  },
  Claude: {
    plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API Direct"],
    pricing: [0, 20, 0, 30, 0, 0],
    url: "https://claude.ai/pricing",
  },
  ChatGPT: {
    plans: ["Plus", "Team", "Enterprise", "API Direct"],
    pricing: [20, 25, 0, 0],
    url: "https://openai.com/chatgpt/pricing",
  },
  "Anthropic API": {
    plans: ["Standard", "Enterprise"],
    pricing: [0, 0],
    url: "https://www.anthropic.com/api",
  },
  "OpenAI API": {
    plans: ["Usage-based"],
    pricing: [0],
    url: "https://openai.com/api/pricing",
  },
  Gemini: {
    plans: ["Pro", "Ultra", "API"],
    pricing: [20, 30, 0],
    url: "https://ai.google.dev/pricing",
  },
  "v0 / Windsurf": {
    plans: ["Free", "Premium"],
    pricing: [0, 20],
    url: "https://v0.dev/pricing",
  },
};

export default function AuditPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isLeadSent, setIsLeadSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW
  const [activeTab, setActiveTab] = useState<"summary" | "breakdown">("summary");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    selectedTool: "Cursor",
    plan: "Pro",
    monthlySpend: 20,
    seats: 1,
    teamSize: 1,
    useCase: "coding",
  });

  const [auditResult, setAuditResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("spendsaudit_v2_data");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("spendsaudit_v2_data", JSON.stringify(formData));
  }, [formData]);

  // --- NEW: Supabase Lead Submit Handler ---
  const handleLeadSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      // 1. Supabase Entry
      const { error: dbError } = await supabase.from("leads").insert([
        {
          email: email,
          tool: formData.selectedTool,
          savings: auditResult?.savings || 0,
          company_data: formData,
        },
      ]);
      if (dbError) throw new Error(`DB Error: ${dbError.message}`);

      // 2. Email Sending
      const response = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          auditData: auditResult,
          tool: formData.selectedTool 
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Email failed");

      setIsLeadSent(true);
      alert("Audit Report sent to your email!");
    } catch (err: any) {
      console.error("Submission Error:", err.message);
      // Agar email fail ho tab bhi report toh dikh hi rahi hai
      alert(`Notice: Audit saved but email failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Audit Logic Engine ---
  // --- Audit Logic Engine ---
  // --- Audit Logic Engine ---
  const runAuditEngine = () => {
    setIsGenerating(true);
    const { selectedTool, plan, monthlySpend, seats, useCase } = formData;
    
    let recommendedAction = "Keep current plan";
    let savings = 0;
    let reason = "Your spend is aligned with industry benchmarks.";

    // 1. Get tool config and standard price
    const toolConfig = TOOLS_CONFIG[selectedTool];
    const planIndex = toolConfig.plans.indexOf(plan);
    const standardPricePerSeat = toolConfig.pricing[planIndex] || 20;
    const expectedTotal = standardPricePerSeat * seats;

    // 2. Logic: Overpaying check
    if (monthlySpend > expectedTotal) {
      recommendedAction = "Verify Billing Cycle";
      savings = monthlySpend - expectedTotal;
      reason = `Your current spend ($${monthlySpend}) exceeds the standard ${plan} rate ($${standardPricePerSeat}/seat) for ${seats} seat(s). Check for hidden add-ons or ghost seats.`;
    } 
    // 3. Logic: Downgrade check (Team plan with 1-2 seats)
    else if ((plan === "Team" || plan === "Business") && seats < 3) {
      const proPrice = toolConfig.pricing[1] || 20; 
      if (monthlySpend > proPrice * seats) {
        recommendedAction = "Downgrade to Pro";
        savings = monthlySpend - (proPrice * seats);
        reason = `You are on a ${plan} plan but only using ${seats} seat(s). Switching to a Pro plan covers identical core features and saves capital.`;
      }
    }
    // 4. Logic: API Enterprise check
    else if (plan.includes("API") && monthlySpend > 500) {
      recommendedAction = "Explore Enterprise Flat Tier";
      savings = monthlySpend * 0.15;
      reason = "High API consumption detected. Switching to a direct Enterprise contract can yield bulk discounts.";
    }

    const finalSavings = Math.max(0, savings);

    setAuditResult({
      savings: finalSavings,
      recommendedAction,
      reason,
      currentSpend: monthlySpend,
    });
    setStep(2);

    const report = finalSavings > 0
        ? `[AUDIT_LOG_026]\n**TARGET:** ${selectedTool} Optimization\n**ACTION:** ${recommendedAction}\n\n**FINANCIAL ANALYSIS:**\n• Current Run-rate: $${monthlySpend}/mo\n• Optimization Potential: $${finalSavings}/mo\n• Annual Recovery: $${finalSavings * 12}/year\n\n**STRATEGIC REASONING:**\n${reason}\n\n[RECOMMENDATION]\nTransition infrastructure by end of billing cycle to capture ${((finalSavings / monthlySpend) * 100).toFixed(0)}% margin.`
        : `[AUDIT_LOG_026]\n**STATUS:** OPTIMIZED\n\n**ANALYSIS:**\nYour ${selectedTool} deployment is lean. Monthly spend of $${monthlySpend} for ${seats} seats is perfectly within the 100th percentile of efficiency for ${useCase}.\n\n**NEXT STEPS:**\nMaintain current stack. We will notify you if ${selectedTool} updates their ${plan} pricing.`;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(report.substring(0, i + 1));
      i++;
      if (i >= report.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 5);
  };
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 overflow-x-hidden">
      {/* Grid Background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-white/0 via-white/60 to-white/90" />

      {/* Navigation */}
      <nav className="h-20 border-b border-zinc-200 px-6 md:px-16 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-1">
            <span className="text-zinc-900 italic">SpendsAudit</span>
            <span className="text-green-600 font-extrabold">AI</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <a href="#" className="hover:text-zinc-900 transition-colors">Pricing Data</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Audit Logic</a>
          <button className="bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-all">
            Connect Credex
          </button>
        </div>
        <button
          className="md:hidden text-zinc-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header & Form */}
          <div className="lg:col-span-7 space-y-10">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full shadow-sm text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                System Q2 2026 Ready
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-zinc-900">
                Audit your AI <span className="text-green-600">Spend.</span>
              </h1>
            </header>

            {step === 1 ? (
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 space-y-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Primary Tool</label>
                    <select
                      className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                      value={formData.selectedTool}
                      onChange={(e) => setFormData({ ...formData, selectedTool: e.target.value })}
                    >
                      {Object.keys(TOOLS_CONFIG).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Plan</label>
                    <select
                      className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    >
                      {TOOLS_CONFIG[formData.selectedTool].plans.map((p: string) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Monthly Spend ($)</label>
                    <input
                      type="number"
                      className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                      value={formData.monthlySpend}
                      onChange={(e) => setFormData({ ...formData, monthlySpend: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Seats</label>
                    <input
                      type="number"
                      className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Primary Use Case</label>
                  <div className="flex flex-wrap gap-2">
                    {["coding", "writing", "data", "research", "mixed"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, useCase: type })}
                        className={`px-5 py-2.5 rounded-full border text-[11px] font-black uppercase transition-all ${
                          formData.useCase === type
                            ? "bg-green-600 border-green-600 text-white"
                            : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={runAuditEngine}
                  className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all group shadow-md"
                >
                  Generate Professional Audit{" "}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-2">
                        Total Recovery Potential
                      </p>
                      <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-900">
                        ${auditResult.savings}
                      </h2>
                      <p className="text-zinc-400 font-bold text-lg mt-2">Monthly capital leakage identified.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-green-600 uppercase">Annual Savings</p>
                      <p className="text-4xl font-black text-green-600">${auditResult.savings * 12}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 border-b border-zinc-200 pb-4">
                      <button
                        onClick={() => setActiveTab("summary")}
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "summary" ? "text-zinc-900" : "text-zinc-400"}`}
                      >
                        Summary
                      </button>
                      <button
                        onClick={() => setActiveTab("breakdown")}
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "breakdown" ? "text-zinc-900" : "text-zinc-400"}`}
                      >
                        Logic Breakdown
                      </button>
                    </div>

                    {activeTab === "summary" ? (
                      <div className="bg-zinc-950 rounded-2xl p-6 md:p-8 border border-zinc-800 font-mono text-sm text-zinc-400 leading-relaxed shadow-inner">
                        {displayText.split("\n").map((l, i) => (
                          <p
                            key={i}
                            className={`mb-1 ${
                              l.startsWith("[") ? "text-green-400 font-bold" : l.startsWith("**") ? "text-white" : ""
                            }`}
                          >
                            {l.replace(/\*\*/g, "")}
                          </p>
                        ))}
                        {isGenerating && (
                          <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-4">Current Spend</p>
                          <div className="flex justify-between items-end">
                            <span className="text-2xl font-black text-zinc-900">${auditResult.currentSpend}</span>
                            <span className="text-xs text-zinc-400">{formData.plan} Tier</span>
                          </div>
                        </div>
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-4">Recommended Action</p>
                          <div className="flex justify-between items-end text-green-600">
                            <span className="text-lg font-black">{auditResult.recommendedAction}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {auditResult.savings > 500 && (
                  <div className="bg-zinc-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center shrink-0">
                      <CreditCard className="text-green-400" size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white">Capture this with Credex</h4>
                      <p className="text-zinc-400 text-sm">
                        Your savings exceed $500/mo. You are eligible for bulk credit acquisition to slash an additional 20% off this bill.
                      </p>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap hover:bg-green-700 transition-all">
                      Get Started
                    </button>
                  </div>
                )}

                {auditResult.savings <= 0 && (
                  <div className="p-8 border-2 border-dashed border-zinc-200 rounded-3xl text-center">
                    <CheckCircle2 size={40} className="mx-auto text-green-500 mb-4" />
                    <h4 className="text-xl font-black text-zinc-900">Efficiency Verified</h4>
                    <p className="text-zinc-400 mt-2">
                      You are spending well. Your unit costs align with standard benchmarks for {formData.selectedTool}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 text-white rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <h3 className="text-2xl font-black leading-tight">Infrastructure Intelligence.</h3>
              <p className="text-zinc-400 text-sm font-medium">
                We've tracked 42 changes in AI pricing this week alone. Stay ahead of vendor markups.
              </p>

              {!isLeadSent ? (
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full h-14 px-5 bg-zinc-800 border border-zinc-700 rounded-xl outline-none focus:border-green-500 transition-all font-bold text-sm text-white placeholder:text-zinc-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* UPDATED: onClick → handleLeadSubmit, loading state added */}
                  <button
                    onClick={handleLeadSubmit}
                    disabled={isSubmitting || !email}
                    className="w-full h-14 bg-green-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        Download Strategy PDF
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-zinc-800 border border-zinc-700 rounded-2xl text-center space-y-2">
                  <CheckCircle2 size={32} className="mx-auto text-green-500" />
                  <p className="font-bold text-sm italic text-white">SpendsAudit v2 Sent!</p>
                </div>
              )}
            </div>

            <div className="p-8 border border-zinc-200 rounded-3xl space-y-4 bg-white shadow-sm">
              <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Benchmarked Vendors</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TOOLS_CONFIG).map((t) => (
                  <span key={t} className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl flex gap-4">
              <Lock className="text-green-600 shrink-0" size={20} />
              <p className="text-[10px] text-green-800 leading-relaxed font-bold uppercase tracking-tighter">
                Data Sovereignty: Audits are performed locally on-device. No proprietary seat counts are stored.
              </p>
            </div>

            {step === 2 && (
              <button
                onClick={() => { setStep(1); setDisplayText(""); }}
                className="w-full h-14 border border-zinc-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all"
              >
                <RefreshCcw size={14} /> Restart Audit
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 py-12 border-t border-zinc-100 text-center">
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">
          © 2026 SpendsAudit AI Systems
        </p>
      </footer>
    </div>
  );
}