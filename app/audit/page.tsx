"use client";

import { useState, useEffect, useRef } from "react";
import {
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Menu,
  X,
  CreditCard,
  Copy,
  ExternalLink,
  ChevronRight,
  Mail,
  ShieldCheck,
  Zap,
  BarChart3,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────
const TOOLS_CONFIG: Record<string, { plans: string[]; pricing: number[]; url: string }> = {
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

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AuditResult {
  savings: number;
  recommendedAction: string;
  reason: string;
  currentSpend: number;
}

interface FormData {
  selectedTool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  useCase: string;
}

// ─────────────────────────────────────────────
// Scanning Progress Bar (Req #7)
// ─────────────────────────────────────────────
const SCAN_STEPS = [
  "Fetching vendor pricing data…",
  "Comparing seat allocation…",
  "Detecting billing anomalies…",
  "Running optimization logic…",
  "Generating recovery roadmap…",
];

function ScanningProgress({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 2800;
    const stepDuration = totalDuration / SCAN_STEPS.length;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= SCAN_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-10 space-y-8 shadow-sm">
      {/* Animated icon */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-ping opacity-60" />
          <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-spin border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={18} className="text-green-600" />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">
            Scanning Infrastructure
          </p>
          <p className="text-sm font-bold text-zinc-900 mt-0.5 transition-all duration-300">
            {SCAN_STEPS[currentStep]}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
          <span>Analyzing…</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex gap-2 items-center">
        {SCAN_STEPS.map((step, i) => (
          <div
            key={step}
            className={`flex-1 h-1 rounded-full transition-all duration-500 ${
              i <= currentStep ? "bg-green-500" : "bg-zinc-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Trust Badge — shown before audit (Req #2)
// ─────────────────────────────────────────────
function TrustBadgeSidebar() {
  return (
    <div className="bg-zinc-900 text-white rounded-3xl p-8 space-y-6">
      <div className="w-12 h-12 bg-green-600/20 rounded-2xl flex items-center justify-center">
        <ShieldCheck className="text-green-400" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-black leading-tight">Your audit is private.</h3>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          All analysis runs locally in your browser. We never store seat counts, vendor names, or spend data unless you explicitly request your full report.
        </p>
      </div>
      <div className="space-y-3 pt-2">
        {[
          "Zero data shared with vendors",
          "No account required to audit",
          "42 pricing changes tracked this week",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
            <span className="text-[11px] font-bold text-zinc-400">{item}</span>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-zinc-800">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          Complete the form to unlock your report →
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Shareable Link with Copy + Open (Req #3)
// ─────────────────────────────────────────────
function ShareableLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <p className="text-[10px] text-zinc-500 mb-3 uppercase tracking-[0.2em] font-black">
        Privacy-Protected Shareable Report:
      </p>
      <div className="bg-black border border-zinc-800 p-2 rounded-xl">
        <div className="px-3 py-1 mb-2">
          <p className="text-[11px] text-green-400 font-mono truncate">{url}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              copied
                ? "bg-green-700 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            <Copy size={12} />
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase bg-green-600 text-white hover:bg-green-700 transition-all"
          >
            <ExternalLink size={12} />
            Open Report
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Multi-Step Form (Req #6 — progressive disclosure)
// ─────────────────────────────────────────────
function MultiStepForm({
  formData,
  setFormData,
  onSubmit,
}: {
  formData: FormData;
  setFormData: (d: FormData) => void;
  onSubmit: () => void;
}) {
  const [formStep, setFormStep] = useState(1);
  const TOTAL_STEPS = 3;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
      {/* Step progress indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                i + 1 < formStep
                  ? "bg-green-600 text-white"
                  : i + 1 === formStep
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              {i + 1 < formStep ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                  i + 1 < formStep ? "bg-green-500" : "bg-zinc-100"
                }`}
              />
            )}
          </div>
        ))}
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">
          Step {formStep}/{TOTAL_STEPS}
        </span>
      </div>

      {/* ── Step 1: Tool & Plan ── */}
      {formStep === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-1">
              Step 1 of 3
            </p>
            <h2 className="text-2xl font-black text-zinc-900">Which tool are you auditing?</h2>
            <p className="text-zinc-400 text-sm mt-1">Select the AI product and your current subscription tier.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Primary Tool</label>
              <select
                className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900 cursor-pointer"
                value={formData.selectedTool}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    selectedTool: e.target.value,
                    plan: TOOLS_CONFIG[e.target.value].plans[0],
                  })
                }
              >
                {Object.keys(TOOLS_CONFIG).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Plan</label>
              <select
                className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900 cursor-pointer"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              >
                {TOOLS_CONFIG[formData.selectedTool].plans.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setFormStep(2)}
            className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all group"
          >
            Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* ── Step 2: Spend & Seats ── */}
      {formStep === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-1">
              Step 2 of 3
            </p>
            <h2 className="text-2xl font-black text-zinc-900">What are you actually paying?</h2>
            <p className="text-zinc-400 text-sm mt-1">Enter your real invoice number — not the plan price.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Monthly Spend ($)</label>
              <input
                type="number"
                min={0}
                className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                value={formData.monthlySpend}
                onChange={(e) => setFormData({ ...formData, monthlySpend: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Seats</label>
              <input
                type="number"
                min={1}
                className="w-full h-14 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-green-500 outline-none font-bold text-zinc-900"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFormStep(1)}
              className="h-14 px-6 border border-zinc-200 rounded-2xl font-black text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 transition-all text-sm"
            >
              Back
            </button>
            <button
              onClick={() => setFormStep(3)}
              className="flex-1 h-14 bg-zinc-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all group"
            >
              Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Use Case ── */}
      {formStep === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-1">
              Step 3 of 3
            </p>
            <h2 className="text-2xl font-black text-zinc-900">How is your team using it?</h2>
            <p className="text-zinc-400 text-sm mt-1">Helps us benchmark against the right cohort.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["coding", "writing", "data", "research", "mixed"].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({ ...formData, useCase: type })}
                className={`px-5 py-2.5 rounded-full border text-[11px] font-black uppercase tracking-wide transition-all ${
                  formData.useCase === type
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200"
                    : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFormStep(2)}
              className="h-14 px-6 border border-zinc-200 rounded-2xl font-black text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 transition-all text-sm"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 h-16 bg-zinc-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all group shadow-md"
            >
              Run Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function AuditPage() {
  // "idle" | "scanning" | "result"
  const [phase, setPhase] = useState<"idle" | "scanning" | "result">("idle");
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isLeadSent, setIsLeadSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "breakdown">("summary");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const reportRef = useRef<string>("");

  const [formData, setFormData] = useState<FormData>({
    selectedTool: "Cursor",
    plan: "Pro",
    monthlySpend: 20,
    seats: 1,
    useCase: "coding",
  });

  // Persist form (non-sensitive fields only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("spendsaudit_v2_data");
      if (saved) setFormData(JSON.parse(saved));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("spendsaudit_v2_data", JSON.stringify(formData));
    } catch (_) {}
  }, [formData]);

  // ── Audit Engine ──
  const runAuditEngine = () => {
    setPhase("scanning");
  };

  // Called after scanning animation completes (Req #7)
  const computeAuditResult = () => {
    const { selectedTool, plan, monthlySpend, seats, useCase } = formData;
    let recommendedAction = "Keep current plan";
    let savings = 0;
    let reason = "Your spend is aligned with industry benchmarks.";

    const toolConfig = TOOLS_CONFIG[selectedTool];
    const planIndex = toolConfig.plans.indexOf(plan);
    const standardPricePerSeat = toolConfig.pricing[planIndex] || 20;
    const expectedTotal = standardPricePerSeat * seats;

    if (monthlySpend > expectedTotal) {
      recommendedAction = "Verify Billing Cycle";
      savings = monthlySpend - expectedTotal;
      reason = `Your current spend ($${monthlySpend}) exceeds the standard ${plan} rate ($${standardPricePerSeat}/seat) for ${seats} seat(s). Check for hidden add-ons or ghost seats.`;
    } else if ((plan === "Team" || plan === "Business") && seats < 3) {
      const proPrice = toolConfig.pricing[1] || 20;
      if (monthlySpend > proPrice * seats) {
        recommendedAction = "Downgrade to Pro";
        savings = monthlySpend - proPrice * seats;
        reason = `You are on a ${plan} plan but only using ${seats} seat(s). Switching to a Pro plan covers identical core features and saves capital.`;
      }
    } else if (plan.includes("API") && monthlySpend > 500) {
      recommendedAction = "Explore Enterprise Flat Tier";
      savings = monthlySpend * 0.15;
      reason = "High API consumption detected. Switching to a direct Enterprise contract can yield bulk discounts.";
    }

    const finalSavings = Math.max(0, Math.round(savings));
    const result: AuditResult = {
      savings: finalSavings,
      recommendedAction,
      reason,
      currentSpend: monthlySpend,
    };

    setAuditResult(result);

    reportRef.current =
      finalSavings > 0
        ? `[AUDIT_LOG_026]\n** TARGET:** ${selectedTool} Optimization\n**ACTION:** ${recommendedAction}\n\n**FINANCIAL ANALYSIS:**\n• Current Run-rate: $${monthlySpend}/mo\n• Optimization Potential: $${finalSavings}/mo\n• Annual Recovery: $${finalSavings * 12}/year\n\n**STRATEGIC REASONING:**\n${reason}\n\n[RECOMMENDATION]\nTransition infrastructure by end of billing cycle to capture ${((finalSavings / monthlySpend) * 100).toFixed(0)}% margin.`
        : `[AUDIT_LOG_026]\n**STATUS:** OPTIMIZED\n\n**ANALYSIS:**\nYour ${selectedTool} deployment is lean. Monthly spend of $${monthlySpend} for ${seats} seat(s) is perfectly within efficiency benchmarks for ${useCase}.\n\n**NEXT STEPS:**\nMaintain current stack. We will notify you if ${selectedTool} updates their ${plan} pricing.`;

    setPhase("result");
    setIsTyping(true);
    setDisplayText("");

    let i = 0;
    const fullText = reportRef.current;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 6);
  };

  // ── Lead Submit (Req #1 & #6 — null guard + robust error handling) ──
  const handleLeadSubmit = async () => {
    // Guard: only proceed if audit is fully computed
    if (!auditResult || auditResult.savings === undefined || auditResult.savings === null) {
      alert("Please complete your audit first before requesting the report.");
      return;
    }
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save to Supabase
      const { data, error: dbError } = await supabase
        .from("leads")
        .insert([
          {
            email,
            tool: formData.selectedTool,
            savings: auditResult.savings,
            company_data: formData,
          },
        ])
        .select();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      // 2. Generate shareable URL
      if (data && data[0]?.id) {
        const generatedUrl = `${window.location.origin}/report/${data[0].id}`;
        setShareUrl(generatedUrl);
      }

      // 3. Send email report
      const response = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          auditData: auditResult,
          tool: formData.selectedTool,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result?.error || `Email API returned ${response.status}`);
      }

      setIsLeadSent(true);
    } catch (err: any) {
      console.error("Submission error:", err.message);
      // Non-blocking: don't lose the lead even if email fails
      if (!isLeadSent) {
        alert(`Your audit was saved, but we couldn't send the email: ${err.message}. Try again shortly.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPhase("idle");
    setDisplayText("");
    setAuditResult(null);
    setShareUrl("");
    setIsLeadSent(false);
    setEmail("");
    setActiveTab("summary");
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
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
      <nav className="h-16 md:h-20 border-b border-zinc-200 px-5 md:px-16 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-1">
          <span className="text-zinc-900 italic">SpendsAudit</span>
          <span className="text-green-600 font-extrabold">AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <a href="#" className="hover:text-zinc-900 transition-colors">Pricing Data</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Audit Logic</a>
          <button className="bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-all">
            Connect Credex
          </button>
        </div>
        <button
          className="md:hidden text-zinc-700 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-5 space-y-4 z-40">
          <a href="#" className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Pricing Data</a>
          <a href="#" className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Audit Logic</a>
          <button className="w-full bg-zinc-900 text-white py-3 rounded-xl font-black text-sm">Connect Credex</button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10 min-w-0">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full shadow-sm text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Q2 2026 — Live Pricing Data
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-zinc-900">
                Audit your AI{" "}
                <span className="text-green-600">Spend.</span>
              </h1>
              <p className="text-zinc-500 text-base md:text-lg font-medium max-w-lg">
                Find out exactly what you're overpaying — in under 60 seconds.
              </p>
            </header>

            {/* Phase: idle → multi-step form */}
            {phase === "idle" && (
              <MultiStepForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={runAuditEngine}
              />
            )}

            {/* Phase: scanning → progress bar (Req #7) */}
            {phase === "scanning" && (
              <ScanningProgress onComplete={computeAuditResult} />
            )}

            {/* Phase: result → report */}
            {phase === "result" && auditResult && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 min-w-0">
                {/* Main result card */}
                <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-2">
                        Total Recovery Potential
                      </p>
                      <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-900 leading-none">
                        ${auditResult.savings}
                      </h2>
                      <p className="text-zinc-400 font-bold text-base md:text-lg mt-2">
                        Monthly capital leakage identified.
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Annual Savings</p>
                      <p className="text-3xl md:text-4xl font-black text-green-600">
                        ${auditResult.savings * 12}
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="space-y-5">
                    <div className="flex gap-4 border-b border-zinc-200 pb-3">
                      {(["summary", "breakdown"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${
                            activeTab === tab
                              ? "text-zinc-900 border-zinc-900"
                              : "text-zinc-400 border-transparent hover:text-zinc-600"
                          }`}
                        >
                          {tab === "summary" ? "Summary" : "Logic Breakdown"}
                        </button>
                      ))}
                    </div>

                    {activeTab === "summary" ? (
                      /* Terminal-style output — overflow handled (Req #5) */
                      <div className="bg-zinc-950 rounded-2xl p-5 md:p-8 border border-zinc-800 font-mono text-xs md:text-sm text-zinc-400 leading-relaxed shadow-inner max-w-full overflow-x-auto">
                        {displayText.split("\n").map((line, i) => (
                          <p
                            key={i}
                            className={`mb-1 break-words ${
                              line.startsWith("[")
                                ? "text-green-400 font-bold"
                                : line.startsWith("**")
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {line.replace(/\*\*/g, "")}
                          </p>
                        ))}
                        {isTyping && (
                          <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
                        )}
                        {/* Shareable link (Req #3) — only after typing & URL exists */}
                        {shareUrl && !isTyping && <ShareableLink url={shareUrl} />}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Current Spend", value: `$${auditResult.currentSpend}`, sub: `${formData.plan} Tier` },
                          { label: "Recommended Action", value: auditResult.recommendedAction, sub: "", green: true },
                          { label: "Seats Audited", value: String(formData.seats), sub: formData.selectedTool },
                          { label: "Use Case", value: formData.useCase, sub: "Primary category" },
                        ].map(({ label, value, sub, green }) => (
                          <div key={label} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200">
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">{label}</p>
                            <div className="flex justify-between items-end gap-2">
                              <span className={`text-lg font-black capitalize leading-tight ${green ? "text-green-600" : "text-zinc-900"}`}>
                                {value}
                              </span>
                              {sub && <span className="text-[10px] text-zinc-400 shrink-0">{sub}</span>}
                            </div>
                          </div>
                        ))}
                        <div className="sm:col-span-2 p-5 bg-zinc-50 rounded-2xl border border-zinc-200">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-2">Reasoning</p>
                          <p className="text-sm text-zinc-700 leading-relaxed">{auditResult.reason}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* High savings CTA */}
                {auditResult.savings > 500 && (
                  <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-14 h-14 bg-green-600/20 rounded-full flex items-center justify-center shrink-0">
                      <CreditCard className="text-green-400" size={28} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-black text-white">Capture this with Credex</h4>
                      <p className="text-zinc-400 text-sm mt-1">
                        Your savings exceed $500/mo. You qualify for bulk credit acquisition — slash an additional 20% off your bill.
                      </p>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap hover:bg-green-700 transition-all self-start sm:self-center">
                      Get Started
                    </button>
                  </div>
                )}

                {/* Efficiency verified */}
                {auditResult.savings <= 0 && (
                  <div className="p-6 md:p-8 border-2 border-dashed border-zinc-200 rounded-3xl text-center space-y-3">
                    <CheckCircle2 size={36} className="mx-auto text-green-500" />
                    <h4 className="text-lg font-black text-zinc-900">Efficiency Verified</h4>
                    <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                      You're spending well. Your unit costs align with standard benchmarks for {formData.selectedTool}.
                    </p>
                  </div>
                )}

                {/* Restart */}
                <button
                  onClick={handleReset}
                  className="w-full h-12 border border-zinc-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all"
                >
                  <RefreshCcw size={13} /> Run Another Audit
                </button>
              </div>
            )}
          </div>

          {/* ── Right Sidebar ── */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6">

            {/* Conditional sidebar: trust badge BEFORE result, lead capture AFTER (Req #2) */}
            {phase !== "result" ? (
              <TrustBadgeSidebar />
            ) : (
              <div className="bg-zinc-900 text-white rounded-3xl p-6 md:p-8 space-y-5">
                {/* Req #4 — Updated copy */}
                <div>
                  <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="text-green-400" size={20} />
                  </div>
                  <h3 className="text-xl font-black leading-snug">
                    Get Your Full Recovery Roadmap
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    Receive a full breakdown with vendor comparison, negotiation scripts, and a 90-day cost reduction plan — straight to your inbox.
                  </p>
                </div>

                {!isLeadSent ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full h-14 px-5 bg-zinc-800 border border-zinc-700 rounded-xl outline-none focus:border-green-500 transition-all font-bold text-sm text-white placeholder:text-zinc-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLeadSubmit()}
                    />
                    {/* Req #4 — "Send Detailed Audit to Email" */}
                    <button
                      onClick={handleLeadSubmit}
                      disabled={isSubmitting || !email || !auditResult}
                      className="w-full h-14 bg-green-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Mail size={16} />
                          Send Detailed Audit to Email
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-zinc-600 text-center font-bold uppercase tracking-widest">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>
                ) : (
                  <div className="p-5 bg-zinc-800 border border-zinc-700 rounded-2xl text-center space-y-2">
                    <CheckCircle2 size={28} className="mx-auto text-green-500" />
                    <p className="font-bold text-sm text-white">Recovery Roadmap sent!</p>
                    <p className="text-[11px] text-zinc-500">Check your inbox — it's on its way.</p>
                  </div>
                )}
              </div>
            )}

            {/* Benchmarked vendors */}
            <div className="p-6 md:p-8 border border-zinc-200 rounded-3xl space-y-4 bg-white shadow-sm">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Benchmarked Vendors</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TOOLS_CONFIG).map((t) => (
                  <span key={t} className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy badge */}
            <div className="p-5 bg-green-50 border border-green-200 rounded-2xl flex gap-3 items-start">
              <Lock className="text-green-600 shrink-0 mt-0.5" size={18} />
              <p className="text-[10px] text-green-800 leading-relaxed font-bold uppercase tracking-tight">
                Data Sovereignty: Audits are performed locally on-device. No proprietary seat counts are stored.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 md:mt-24 py-10 border-t border-zinc-100 text-center">
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">
          © 2026 SpendsAudit AI Systems
        </p>
      </footer>
    </div>
  );
}