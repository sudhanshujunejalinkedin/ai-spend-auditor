import { Resend } from 'resend';
import Groq from "groq-sdk";

const resend = new Resend(process.env.RESEND_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { email, auditData, tool } = await req.json();

    // 1. LLM se Professional Summary
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a senior FinOps consultant. Write a short, punchy 3-sentence professional audit summary based on the provided data. Use a serious, corporate tone. No bullet points, plain prose only.",
        },
        {
          role: "user",
          content: `Tool: ${tool}, Monthly Savings Identified: $${auditData.savings}, Reason: ${auditData.reason}, Recommended Action: ${auditData.recommendedAction}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const aiSummary =
      completion.choices[0]?.message?.content || auditData.reason;

    const annualSavings = (auditData.savings * 12).toLocaleString();
    const monthlySavings = auditData.savings.toLocaleString();
    const currentSpend = auditData.currentSpend?.toLocaleString?.() ?? "—";
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // 2. Email HTML
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SpendsAudit Report</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#09090b;border-radius:16px 16px 0 0;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;">
                      <em>SpendsAudit</em><span style="color:#10b981;">AI</span>
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#52525b;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
                      Audit Report — ${date}
                    </p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#10b981;color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:999px;">
                      ● Live Analysis
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Savings Banner -->
          <tr>
            <td style="background:#18181b;padding:40px 40px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#10b981;">
                Total Recovery Potential
              </p>
              <p style="margin:0;font-size:64px;font-weight:900;color:#ffffff;letter-spacing:-3px;line-height:1;">
                $${monthlySavings}
                <span style="font-size:20px;color:#52525b;font-weight:600;letter-spacing:0;">/mo</span>
              </p>
              <p style="margin:8px 0 0;font-size:14px;color:#71717a;">
                Annualised recovery opportunity: 
                <strong style="color:#10b981;">$${annualSavings}/year</strong>
              </p>
            </td>
          </tr>

          <!-- Divider line -->
          <tr>
            <td style="background:#18181b;padding:0 40px;">
              <div style="height:1px;background:#27272a;"></div>
            </td>
          </tr>

          <!-- Stats Row -->
          <tr>
            <td style="background:#18181b;padding:24px 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="padding-right:12px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#52525b;">Tool Audited</p>
                    <p style="margin:0;font-size:16px;font-weight:800;color:#ffffff;">${tool}</p>
                  </td>
                  <td width="33%" style="padding-right:12px;border-left:1px solid #27272a;padding-left:16px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#52525b;">Current Spend</p>
                    <p style="margin:0;font-size:16px;font-weight:800;color:#ffffff;">$${currentSpend}<span style="font-size:11px;color:#52525b;">/mo</span></p>
                  </td>
                  <td width="33%" style="border-left:1px solid #27272a;padding-left:16px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#52525b;">Action</p>
                    <p style="margin:0;font-size:13px;font-weight:800;color:#10b981;">${auditData.recommendedAction}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- White Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Executive Summary -->
              <p style="margin:0 0 8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#a1a1aa;">
                Executive Summary
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#27272a;line-height:1.7;font-weight:500;">
                ${aiSummary}
              </p>

              <!-- Divider -->
              <div style="height:1px;background:#f4f4f5;margin-bottom:32px;"></div>

              <!-- Recommended Action Block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#15803d;">
                      ✦ Recommended Action
                    </p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#14532d;">
                      ${auditData.recommendedAction}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reasoning -->
              <p style="margin:0 0 8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#a1a1aa;">
                Audit Reasoning
              </p>
              <p style="margin:0 0 32px;font-size:14px;color:#52525b;line-height:1.7;">
                ${auditData.reason}
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://spendsaudit.ai" 
                       style="display:inline-block;background:#09090b;color:#ffffff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;padding:16px 36px;border-radius:10px;text-decoration:none;">
                      View Full Report Dashboard →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f5;border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#a1a1aa;">
                      Generated by <strong>SpendsAudit AI Engine</strong> · ${date}
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;">
                      This report is confidential and intended solely for the recipient.
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:1px;">
                      <a href="#" style="color:#d4d4d8;text-decoration:none;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // 3. Send
    const { data, error } = await resend.emails.send({
      from: "SpendsAudit AI <onboarding@resend.dev>",
      to: email,
      subject: `$${monthlySavings}/mo identified — Your ${tool} Audit Report`,
      html,
    });

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ data });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}