export const runAudit = (tools: any[]) => {
  // Standard Market Rates (PDF Requirement: Citation needed in PRICING_DATA.md)
  const MARKET_RATES: Record<string, number> = {
    "ChatGPT": 20, // Plus/Team standard
    "Claude": 20,  // Pro standard
    "Cursor": 20,  // Pro standard
    "Gemini": 20,  // Advanced standard
    "v0 / Windsurf": 20
  };

  let totalCurrent = 0;
  let totalRecommended = 0;

  const breakdown = tools.map(tool => {
    totalCurrent += tool.monthlySpend;
    
    // Logic: Agar user tool ka naam "ChatGPT" select karta hai, 
    // to hum uska rates standard $20 se compare karenge
    const standardPrice = MARKET_RATES[tool.name] || tool.monthlySpend;
    const recommendedPrice = standardPrice * (tool.teamSize || 1);
    
    totalRecommended += recommendedPrice;

    return {
      tool: tool.name,
      current: tool.monthlySpend,
      recommended: recommendedPrice,
      note: tool.monthlySpend > recommendedPrice 
        ? `Overpaying identified. Standard rate for ${tool.name} is $${standardPrice}/seat.`
        : "Pricing is currently optimized for this tool."
    };
  });

  const savings = totalCurrent - totalRecommended;

  return {
    current: totalCurrent,
    recommended: totalRecommended,
    savings: savings > 0 ? savings : 0,
    breakdown: breakdown
  };
};