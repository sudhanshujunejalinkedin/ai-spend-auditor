import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { auditData } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional AI Cost Auditor. Provide a ~100-word personalized summary of the audit findings. Focus on where they are overspending and what is the biggest opportunity for savings."
        },
        {
          role: "user",
          content: `Here is the audit data: ${JSON.stringify(auditData)}. Summarize the savings opportunity.`
        }
      ],
      max_tokens: 200,
    });

    return NextResponse.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error("AI Summary Error:", error);
    // Fallback summary agar API fail ho jaye [cite: 320]
    return NextResponse.json({ 
      summary: "Based on your current stack, you can achieve significant savings by switching to annual plans or consolidating seats. Contact Credex for a full credit-based discount plan." 
    });
  }
}