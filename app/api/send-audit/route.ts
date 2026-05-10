import { Resend } from 'resend';
import Groq from "groq-sdk";

// ── Exact same init as original ──
const resend = new Resend(process.env.RESEND_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { email, auditData, tool } = await req.json();

    // ── 1. Groq call — exact same as original ──
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a senior FinOps consultant. Write a short, punchy 3-sentence professional audit summary based on the provided data. Use a serious, corporate tone."
        },
        {
          role: "user",
          content: `Tool: ${tool}, Savings: $${auditData.savings}, Reason: ${auditData.reason}`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const aiSummary = completion.choices[0]?.message?.content || auditData.reason;

    // ── 2. Resend call — exact same from/to/subject as original, only html changed ──
    const { data, error } = await resend.emails.send({
      from: 'SpendsAudit AI <onboarding@resend.dev>',
      to: email,
      subject: `Action Required: $${auditData.savings} Savings Identified for ${tool}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#09090b;border-radius:16px 16px 0 0;padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td>
              <p style="margin:0;font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.5px;">
                <em>SpendsAudit</em><span style="color:#10b981;">AI</span>
              </p>
            </td>
            <td align="right">
              <span style="background:#10b981;color:#fff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;padding:5px 12px;border-radius:999px;">
                Audit Report
              </span>
            </td>
          </tr></table>
        </td>
      </tr>

      <!-- Savings Hero -->
      <tr>
        <td style="background:#18181b;padding:36px 36px 28px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#10b981;">
            Monthly Recovery Potential
          </p>
          <p style="margin:0;font-size:60px;font-weight:900;color:#fff;letter-spacing:-3px;line-height:1;">
            $${auditData.savings}
          </p>
          <p style="margin:8px 0 0;font-size:13px;color:#71717a;">
            Annual opportunity: <strong style="color:#10b981;">$${auditData.savings * 12}/year</strong>
          </p>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="background:#18181b;padding:0 36px;">
          <div style="height:1px;background:#27272a;"></div>
        </td>
      </tr>

      <!-- Tool + Action row -->
      <tr>
        <td style="background:#18181b;padding:20px 36px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="50%">
              <p style="margin:0 0 3px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#52525b;">Tool Audited</p>
              <p style="margin:0;font-size:15px;font-weight:800;color:#fff;">${tool}</p>
            </td>
            <td width="50%" style="border-left:1px solid #27272a;padding-left:20px;">
              <p style="margin:0 0 3px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#52525b;">Recommended Action</p>
              <p style="margin:0;font-size:14px;font-weight:800;color:#10b981;">${auditData.recommendedAction}</p>
            </td>
          </tr></table>
        </td>
      </tr>

      <!-- White body -->
      <tr>
        <td style="background:#fff;padding:36px;">

          <!-- Executive Summary -->
          <p style="margin:0 0 6px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#a1a1aa;">
            Executive Summary
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#27272a;line-height:1.7;">
            ${aiSummary}
          </p>

          <div style="height:1px;background:#f4f4f5;margin-bottom:28px;"></div>

          <!-- Savings breakdown — same data as original -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;margin-bottom:28px;">
            <tr>
              <td style="padding:18px 22px;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#15803d;">
                  Financial Breakdown
                </p>
                <p style="margin:0 0 4px;font-size:14px;color:#14532d;">
                  <strong>Potential Monthly Savings:</strong> $${auditData.savings}
                </p>
                <p style="margin:0;font-size:14px;color:#14532d;">
                  <strong>Annual Recovery:</strong> $${auditData.savings * 12}
                </p>
              </td>
            </tr>
          </table>

          <!-- Recommended Action -->
          <p style="margin:0 0 6px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#a1a1aa;">
            Recommended Action
          </p>
          <p style="margin:0 0 28px;font-size:14px;color:#52525b;line-height:1.7;">
            ${auditData.recommendedAction}
          </p>

          <hr style="border:none;border-top:1px solid #f4f4f5;margin:0 0 20px;"/>
          <p style="margin:0;font-size:12px;color:#a1a1aa;">
            This audit was generated by SpendsAudit AI Engine.
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f4f4f5;border-radius:0 0 16px 16px;padding:20px 36px;">
          <p style="margin:0;font-size:11px;color:#a1a1aa;">
            © 2026 SpendsAudit AI Systems · All data processed locally.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
      `,
    });

    // ── 3. Error handling — exact same as original ──
    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ data });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}