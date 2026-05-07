"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  ShieldCheck, 
  Share2, 
  RefreshCcw, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Download,
  Terminal,
  Activity,
  Menu,
  X,
  TrendingUp,
  CreditCard
} from "lucide-react";

// --- Pricing & Logic Data ---
const TOOLS_CONFIG: Record<string, any> = {
  "Cursor": { plans: ["Hobby", "Pro", "Business", "Enterprise"], pricing: [0, 20, 40, 100], url: "https://www.cursor.com/pricing" },
  "GitHub Copilot": { plans: ["Individual", "Business", "Enterprise"], pricing: [10, 19, 39], url: "https://github.com/features/copilot#pricing" },
  "Claude": { plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API Direct"], pricing: [0, 20, 0, 30, 0, 0], url: "https://claude.ai/pricing" },
  "ChatGPT": { plans: ["Plus", "Team", "Enterprise", "API Direct"], pricing: [20, 25, 0, 0], url: "https://openai.com/chatgpt/pricing" },
  "Anthropic API": { plans: ["Standard", "Enterprise"], pricing: [0, 0], url: "https://www.anthropic.com/api" },
  "OpenAI API": { plans: ["Usage-based"], pricing: [0], url: "https://openai.com/api/pricing" },
  "Gemini": { plans: ["Pro", "Ultra", "API"], pricing: [20, 30, 0], url: "https://ai.google.dev/pricing" },
  "v0 / Windsurf": { plans: ["Free", "Premium"], pricing: [0, 20], url: "https://v0.dev/pricing" }
};

export default function AuditPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isLeadSent, setIsLeadSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'breakdown'>('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Persisted Form State
  const [formData, setFormData] = useState({
    selectedTool: "Cursor",
    plan: "Pro",
    monthlySpend: 20,
    seats: 1,
    teamSize: 1,
    useCase: "coding"
  });

  const [auditResult, setAuditResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('spendsaudit_v2_data');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('spendsaudit_v2_data', JSON.stringify(formData));
  }, [formData]);

  // --- Audit Logic Engine ---
  const runAuditEngine = () => {
    setIsGenerating(true);
    const { selectedTool, plan, monthlySpend, seats, useCase } = formData;
    let recommendedAction = "Keep current plan";
    let savings = 0;
    let reason = "Your spend is aligned with industry benchmarks.";

    // 1. Logic: Plan vs Seats (e.g., Team plan for small seats)
    if ((plan === "Team" || plan === "Business") && seats < 3) {
      recommendedAction = "Downgrade to Individual/Pro";
      const individualPrice = TOOLS_CONFIG[selectedTool].pricing[1] || 20;
      savings = monthlySpend - (individualPrice * seats);
      reason = `You are paying for organizational overhead ($${monthlySpend}) but only utilizing ${seats} seats. Individual Pro plans cover identical core features.`;
    } 
    // 2. Logic: High API Spend vs Flat Tiers
    else if (plan.includes("API") && monthlySpend > 500) {
      recommendedAction = "Explore Enterprise Flat Tier";
      savings = monthlySpend * 0.15; // Estimated 15% via credits
      reason = "High API consumption detected. Switching to a direct Enterprise contract or using Credex can yield bulk discounts.";
    }
    // 3. Logic: Overpaying Retail
    else if (monthlySpend > (TOOLS_CONFIG[selectedTool].pricing[TOOLS_CONFIG[selectedTool].plans.indexOf(plan)] * seats)) {
      recommendedAction = "Verify Billing Cycle";
      savings = monthlySpend - (TOOLS_CONFIG[selectedTool].pricing[TOOLS_CONFIG[selectedTool].plans.indexOf(plan)] * seats);
      reason = "Your current spend exceeds the standard retail rate for this seat count. Check for ghost seats.";
    }

    setAuditResult({ savings: Math.max(0, savings), recommendedAction, reason, currentSpend: monthlySpend });
    setStep(2);

    const report = savings > 0 
      ? `[AUDIT_LOG_026]\n**TARGET:** ${selectedTool} Optimization\n**ACTION:** ${recommendedAction}\n\n**FINANCIAL ANALYSIS:**\n• Current Run-rate: $${monthlySpend}/mo\n• Optimization Potential: $${savings}/mo\n• Annual Recovery: $${savings * 12}/year\n\n**STRATEGIC REASONING:**\n${reason}\n\n[RECOMMENDATION]\nTransition infrastructure by end of billing cycle to capture ${((savings/monthlySpend)*100).toFixed(0)}% margin.`
      : `[AUDIT_LOG_026]\n**STATUS:** OPTIMIZED\n\n**ANALYSIS:**\nYour ${selectedTool} deployment is lean. Monthly spend of $${monthlySpend} for ${seats} seats is perfectly within the 100th percentile of efficiency for ${useCase}.\n\n**NEXT STEPS:**\nMaintain current stack. We will notify you if ${selectedTool} updates their ${plan} pricing.`;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(report.substring(0, i + 1));
      i++;
      if (i >= report.length) { clearInterval(interval); setIsGenerating(false); }
    }, 5);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="h-20 border-b border-zinc-900 px-6 md:px-16 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-1">
            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent italic">SpendsAudit</span>
            <span className="text-blue-500 font-extrabold">AI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Pricing Data</a>
          <a href="#" className="hover:text-white transition-colors">Audit Logic</a>
          <button className="bg-white text-black px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all">Connect Credex</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Header & Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <Activity size={12} className="text-blue-500" /> System Q2 2026 Ready
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
                Audit your AI <span className="text-zinc-600">Spend.</span>
              </h1>
            </header>

            {step === 1 ? (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Tool</label>
                    <select 
                      className="w-full h-14 px-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-blue-500 outline-none font-bold"
                      value={formData.selectedTool}
                      onChange={(e) => setFormData({...formData, selectedTool: e.target.value})}
                    >
                      {Object.keys(TOOLS_CONFIG).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Plan</label>
                    <select 
                      className="w-full h-14 px-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-blue-500 outline-none font-bold"
                      value={formData.plan}
                      onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    >
                      {TOOLS_CONFIG[formData.selectedTool].plans.map((p: string) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Monthly Spend ($)</label>
                    <input 
                      type="number" 
                      className="w-full h-14 px-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-blue-500 outline-none font-bold"
                      value={formData.monthlySpend}
                      onChange={(e) => setFormData({...formData, monthlySpend: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Seats</label>
                    <input 
                      type="number" 
                      className="w-full h-14 px-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-blue-500 outline-none font-bold"
                      value={formData.seats}
                      onChange={(e) => setFormData({...formData, seats: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Use Case</label>
                  <div className="flex flex-wrap gap-2">
                    {['coding', 'writing', 'data', 'research', 'mixed'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, useCase: type})}
                        className={`px-5 py-2.5 rounded-xl border text-[11px] font-black uppercase transition-all ${
                          formData.useCase === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={runAuditEngine}
                  className="w-full h-16 bg-white text-black rounded-xl font-black flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all group"
                >
                  Generate Professional Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Hero Results */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2">Total Recovery Potential</p>
                      <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
                        ${auditResult.savings}
                      </h2>
                      <p className="text-zinc-500 font-bold text-lg mt-2">Monthly capital leakage identified.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-green-500 uppercase">Annual Savings</p>
                      <p className="text-4xl font-black text-green-500">${auditResult.savings * 12}</p>
                    </div>
                  </div>

                  {/* Per-Tool Breakdown */}
                  <div className="space-y-6">
                    <div className="flex gap-4 border-b border-zinc-800 pb-4">
                      <button onClick={() => setActiveTab('summary')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'summary' ? 'text-white' : 'text-zinc-600'}`}>Summary</button>
                      <button onClick={() => setActiveTab('breakdown')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'breakdown' ? 'text-white' : 'text-zinc-600'}`}>Logic Breakdown</button>
                    </div>

                    {activeTab === 'summary' ? (
                      <div className="bg-zinc-950 rounded-2xl p-6 md:p-8 border border-zinc-800 font-mono text-sm text-zinc-400 leading-relaxed shadow-inner">
                        {displayText.split('\n').map((l, i) => (
                          <p key={i} className={`mb-1 ${l.startsWith('[') ? 'text-blue-500 font-bold' : l.startsWith('**') ? 'text-white' : ''}`}>
                            {l.replace(/\*\*/g, '')}
                          </p>
                        ))}
                        {isGenerating && <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1" />}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                          <p className="text-[10px] font-black text-zinc-500 uppercase mb-4">Current Spend</p>
                          <div className="flex justify-between items-end">
                            <span className="text-2xl font-black text-white">${auditResult.currentSpend}</span>
                            <span className="text-xs text-zinc-500">{formData.plan} Tier</span>
                          </div>
                        </div>
                        <div className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                          <p className="text-[10px] font-black text-zinc-500 uppercase mb-4">Recommended Action</p>
                          <div className="flex justify-between items-end text-blue-400">
                            <span className="text-lg font-black">{auditResult.recommendedAction}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Credex Feature for High Savings */}
                {auditResult.savings > 500 && (
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-blue-900/40">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <CreditCard className="text-white" size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white">Capture this with Credex</h4>
                      <p className="text-blue-100 text-sm">Your savings exceed $500/mo. You are eligible for bulk credit acquisition to slash an additional 20% off this bill.</p>
                    </div>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap hover:scale-105 transition-transform">Get Started</button>
                  </div>
                )}

                {auditResult.savings <= 0 && (
                  <div className="p-8 border-2 border-dashed border-zinc-800 rounded-3xl text-center">
                    <CheckCircle2 size={40} className="mx-auto text-green-500 mb-4" />
                    <h4 className="text-xl font-black text-white">Efficiency Verified</h4>
                    <p className="text-zinc-500 mt-2">You are spending well. Your unit costs align with standard benchmarks for {formData.selectedTool}.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white text-black rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <h3 className="text-2xl font-black leading-tight">Infrastructure Intelligence.</h3>
              <p className="text-zinc-600 text-sm font-medium">
                We've tracked 42 changes in AI pricing this week alone. Stay ahead of vendor markups.
              </p>
              
              {!isLeadSent ? (
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full h-14 px-5 bg-zinc-100 border border-zinc-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    onClick={() => setIsLeadSent(true)}
                    className="w-full h-14 bg-black text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all"
                  >
                    <Download size={18} />
                    Download Strategy PDF
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 size={32} className="mx-auto text-green-600" />
                  <p className="font-bold text-sm italic text-black">SpendsAudit v2 Sent!</p>
                </div>
              )}
            </div>

            <div className="p-8 border border-zinc-800 rounded-3xl space-y-4">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Benchmarked Vendors</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TOOLS_CONFIG).map(t => (
                  <span key={t} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-400">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-4">
              <Lock className="text-blue-500 shrink-0" size={20} />
              <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-tighter">
                Data Sovereignty: Audits are performed locally on-device. No proprietary seat counts are stored.
              </p>
            </div>

            {step === 2 && (
              <button 
                onClick={() => {setStep(1); setDisplayText("");}} 
                className="w-full h-14 border border-zinc-800 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all"
              >
                <RefreshCcw size={14} /> Restart Audit
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 py-12 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 SpendsAudit AI Systems</p>
      </footer>
    </div>
  );
}