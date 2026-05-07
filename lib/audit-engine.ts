export const runAudit = (tools: any[]) => {
  let currentSpend = 0;
  let recommendedSpend = 0;

  const breakdown = tools.map(tool => {
    currentSpend += tool.monthlySpend;
    let rec = tool.monthlySpend;
    let note = "Plan is optimal.";

    // Logic: ChatGPT Team minimum 2 seats check
    if (tool.name === 'ChatGPT' && tool.plan === 'Team' && tool.seats < 2) {
      rec = 20; 
      note = "Downgrade to Plus (Team needs 2+ seats).";
    }
    
    // Logic: Claude API vs Pro seat
    if (tool.name === 'Claude' && tool.monthlySpend > 40) {
      rec = 20;
      note = "Switch to Pro seat for flat-rate usage.";
    }

    recommendedSpend += rec;
    return { ...tool, recommendedPrice: rec, note };
  });

  return {
    current: currentSpend,
    recommended: recommendedSpend,
    savings: currentSpend - recommendedSpend,
    breakdown
  };
};