"use client";
import { useState } from "react";
import { runAudit } from "@/lib/audit-engine";

export default function AuditPage() {
  const [step, setStep] = useState(1);
  const [toolData, setToolData] = useState({
    name: "ChatGPT",
    plan: "Plus",
    monthlySpend: 20,
    seats: 1,
  });
  const [results, setResults] = useState<any>(null);

  const handleAudit = () => {
    const report = runAudit([toolData]);
    setResults(report);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-zinc-100 p-10">
        
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-zinc-900">Step 1: Your Tools</h2>
              <p className="text-zinc-500 mt-2">Tell us what you're currently using.</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-zinc-700">Select AI Tool</label>
              <select 
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setToolData({...toolData, name: e.target.value})}
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
              </select>

              <label className="block text-sm font-semibold text-zinc-700">Monthly Spend (USD)</label>
              <input 
                type="number" 
                placeholder="e.g. 20"
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={toolData.monthlySpend}
                onChange={(e) => setToolData({...toolData, monthlySpend: Number(e.target.value)})}
              />
            </div>

            <button 
              onClick={handleAudit}
              className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black hover:scale-[1.02] active:scale-95 transition-all"
            >
              Run AI Audit →
            </button>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex p-4 bg-green-50 rounded-full">
              <span className="text-3xl">💰</span>
            </div>
            <h2 className="text-4xl font-black text-zinc-900">
              Potential Savings: <span className="text-green-600">${results.savings}</span>
            </h2>
            
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 space-y-2 text-left">
              <p className="flex justify-between text-zinc-600">
                <span>Current Monthly:</span> 
                <span className="font-bold text-zinc-900">${results.current}</span>
              </p>
              <p className="flex justify-between text-blue-600 font-medium">
                <span>Optimized Price:</span> 
                <span className="font-bold">${results.recommended}</span>
              </p>
              <div className="pt-4 border-t border-zinc-200 mt-4">
                <p className="text-sm text-zinc-500 leading-relaxed italic">
                  💡 {results.breakdown[0].note}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="w-full py-4 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all"
            >
              Start New Audit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}