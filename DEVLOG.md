# Development Logs: SpendsAudit AI

## Day 1 — 2026-05-06
**Hours worked:** 3  
**What I did:** * Initialized Next.js project with Tailwind CSS.  
* Set up the basic layout and the navigation bar with the typography logo "SpendsAudit AI".  
**What I learned:** Zinc-950 combined with subtle borders creates a much more "enterprise" feel than pure black.  
**Blockers:** Deciding whether to use a multi-step form or a single-page long form.  
**Plan for tomorrow:** Finalize the input form and tool selection logic.

---

## Day 2 — 2026-05-07
**Hours worked:** 5  
**What I did:** * Built the spend input form.  
* Integrated `localStorage` to ensure form state persists across reloads (Requirement #1).  
**What I learned:** Handling number inputs in React can be tricky with null values; needed to ensure `Number(e.target.value)` is handled safely.  
**Blockers:** Getting the select dropdowns to style consistently across different browsers.  
**Plan for tomorrow:** Start building the Audit Engine logic.

---

## Day 3 — 2026-05-08
**Hours worked:** 6  
**What I did:** * Developed the core Audit Engine.  
* Mapped out pricing for Cursor, ChatGPT, and Claude.  
* Created the logic for seat-count vs. plan efficiency.  
**What I learned:** Pricing models are not linear. For example, some "Team" plans require a minimum of 3 seats, making them more expensive for 2 users than individual Pro plans.  
**Blockers:** Fetching the most current API pricing for OpenAI vs. Anthropic.  
**Plan for tomorrow:** Build the results page and the "Hero" savings section.

---

## Day 4 — 2026-05-09
**Hours worked:** 2  
**What I did:** * Minor UI polish.  
* Fixed a bug where `localStorage` was being cleared on certain navigation events.  
**What I learned:** Always check for `window` availability when using `localStorage` in Next.js to avoid hydration errors.  
**Blockers:** Feeling a bit burnt out, took the afternoon off to research GTM strategies.  
**Plan for tomorrow:** Finalize the "Savings" hero section and audit breakdown.

---

## Day 5 — 2026-05-10
**Hours worked:** 7  
**What I did:** * Built the Results Page.  
* Implemented the "Typewriter" effect for the audit report to make it feel like a real-time AI analysis.  
* Integrated the Credex surface logic for $500+ savings.  
**What I learned:** Animation speed matters. 5ms per char is the sweet spot—too slow is boring, too fast looks like a glitch.  
**Blockers:** Designing the "Optimal Spend" state so it doesn't look like a "failed" audit.  
**Plan for tomorrow:** Write automated tests for the audit engine.

---

## Day 6 — 2026-05-11
**Hours worked:** 5  
**What I did:** * Set up Vitest for unit testing.  
* Wrote 5 core tests covering: seat-based downgrades, API credit logic, and standard retail pricing checks.  
**What I learned:** Writing tests for logic is easy, but mocking the React state for form persistence is more complex.  
**Blockers:** GitHub Actions workflow was failing due to a mismatch in Node versions.  
**Plan for tomorrow:** Final documentation and deployment.

---

## Day 7 — 2026-05-12
**Hours worked:** 4  
**What I did:** * Wrote `README.md`, `ARCHITECTURE.md`, and `GTM.md`.  
* Deployed the app to Vercel.  
* Verified all pricing links in `PRICING_DATA.md`.  
**What I learned:** Documentation takes almost as much effort as the code if you want to do it right.  
**Blockers:**  None. Ready for submission.  
**Plan for tomorrow:** Submit the assignment.