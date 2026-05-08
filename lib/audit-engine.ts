export const runAudit = (tools: any[]) => {
  // Standard Market Rates (Per Seat)
  const MARKET_RATES: Record<string, number> = {
    "chatgpt": 20, 
    "claude": 20,  
    "cursor": 20,  
    "gemini": 20,  
    "v0": 20
  };

  let totalCurrent = 0;
  let totalRecommended = 0;

  const breakdown = tools.map(tool => {
    // Current spend humesha number hona chahiye
    const currentSpend = Number(tool.monthlySpend) || 0;
    totalCurrent += currentSpend;
    
    // Tool name ko normalize kar rahe hain taaki "ChatGPT" aur "chatgpt" dono chalein
    const toolKey = tool.name.toLowerCase();
    const standardPricePerSeat = MARKET_RATES[toolKey] || 20;
    
    // Actual Seats count (default 1)
    const seats = Number(tool.teamSize) || 1;
    
    // Ideal keemat = Standard Rate * Seats
    const recommendedPrice = standardPricePerSeat * seats;
    totalRecommended += recommendedPrice;

    const isOverpaying = currentSpend > recommendedPrice;

    return {
      tool: tool.name,
      current: currentSpend,
      recommended: recommendedPrice,
      savings: isOverpaying ? currentSpend - recommendedPrice : 0,
      note: isOverpaying 
        ? `Overpaying! Standard rate for ${tool.name} is $${standardPricePerSeat}/seat.`
        : "Pricing is currently optimized for this tool."
    };
  });

  const totalSavings = totalCurrent - totalRecommended;

  return {
    current: totalCurrent,
    recommended: totalRecommended,
    savings: totalSavings > 0 ? totalSavings : 0,
    breakdown: breakdown
  };
};