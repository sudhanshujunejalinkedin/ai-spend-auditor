import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Ye API key Vercel ke dashboard mein add kar dena
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, auditData } = await req.json();

    const data = await resend.emails.send({
      from: 'SpendsAudit AI <onboarding@resend.dev>',
      to: email, // User ko jayega
      subject: 'Your AI Spend Audit Report',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Audit Complete!</h2>
          <p>We analyzed your spend for <strong>${auditData.recommendedAction}</strong>.</p>
          <p>Potential Monthly Savings: <strong>$${auditData.savings}</strong></p>
          <hr />
          <p>Our team at Credex will reach out to help you capture these savings.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
  }
}