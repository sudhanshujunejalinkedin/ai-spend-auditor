# Development Logs: SpendsAudit AI

## Day 1 — 2026-05-05
**Hours worked:** 3  
**What I did:** * Initialized Next.js project with Tailwind CSS and Lucide icons.  
* Set up the base layout and the branding "SpendsAudit AI".  
**What I learned:** Zinc-950 with subtle borders creates a high-end "FinOps" feel better than standard black.  
**Blockers:** Choosing between a single-page form and a multi-step wizard.  
**Plan for tomorrow:** Build the lead capture and tool selection UI.

---

## Day 2 — 2026-05-06
**Hours worked:** 5  
**What I did:** * Built the multi-step spend input form.  
* Integrated `localStorage` for form state persistence (Requirement #1).  
**What I learned:** React number inputs need careful handling with `Number(e.target.value)` to avoid NaN during hydration.  
**Blockers:** Styling custom select dropdowns for cross-browser consistency.  
**Plan for tomorrow:** Implement core Audit Engine logic.

---

## Day 3 — 2026-05-07
**Hours worked:** 6  
**What I did:** * Developed the core Audit Engine logic.  
* Mapped pricing tiers for Cursor, ChatGPT, and Claude into `TOOLS_CONFIG`.  
* Created seat-count vs. plan efficiency algorithms.  
**What I learned:** Many "Team" plans have a 3-seat minimum, making them a "spend trap" for 2-person startups.  
**Blockers:** Sourcing verified pricing links for the `PRICING_DATA.md` file.  
**Plan for tomorrow:** Build the results page and "Hero" savings UI.

---

## Day 4 — 2026-05-08
**Hours worked:** 3  
**What I did:** * Built the Results Page with a real-time "Scanning" animation.  
* Integrated Supabase for lead storage (storing emails and audit results).  
**What I learned:** Using a progress bar with custom steps increases user "perceived value" of the audit.  
**Blockers:** Supabase connection string issues in the local `.env`.  
**Plan for tomorrow:** Finalize the "AI Analysis" typewriter report.

---

## Day 5 — 2026-05-09
**Hours worked:** 5  
**What I did:** * Implemented the "Typewriter" console effect for the audit report.  
* Added logic to detect $500+ savings for enterprise surfacing.  
**What I learned:** 6ms per character is the optimal speed for the typewriter—any slower feels laggy.  
**Blockers:** Designing the "Fully Optimized" state so users don't feel the audit "failed" if they have 0 savings.  
**Plan for tomorrow:** Integrate Email Service (Brevo/Nodemailer).

---

## Day 6 — 2026-05-10
**Hours worked:** 6  
**What I did:** * Integrated Brevo (Nodemailer) for automated email delivery of reports.  
* Fixed a major bug where the API endpoint was returning `[object Object]` in alerts.  
**What I learned:** SMTP relay via Brevo is much more reliable for production than simple Gmail SMTP.  
**Blockers:** Parsing asynchronous errors from the `/api/send-email` route.  
**Plan for tomorrow:** Final documentation and Vercel deployment.

---

## Day 7 — 2026-05-11
**Hours worked:** 5  
**What I did:** * Finalized `README.md`, `ARCHITECTURE.md`, and `GTM.md`.  
* Resolved Build Errors (EOF and unclosed brackets) in `page.tsx`.  
* Deployed to Vercel and verified environment variables.  
**What I learned:** Documentation takes as much effort as code when aiming for a "Senior Engineer" submission.  
**Blockers:** GitHub Actions Node version mismatch (Fixed by updating YAML).  
**Status:** **PROJECT COMPLETE. Ready for submission.**