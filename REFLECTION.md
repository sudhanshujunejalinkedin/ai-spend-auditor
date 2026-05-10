# REFLECTION.md

**1. The Hardest Bug:**
The "404 Audit Not Found" error on Vercel deployment. 
* **Hypothesis:** I thought it was a database sync delay between Supabase and the frontend.
* **Debugging:** I tried adding `no-cache` headers and manual refreshes.
* **Actual Fix:** I discovered that Next.js 15 treats `params` as a Promise. I had to `await params` in my `PublicReport` component to correctly extract the ID.

**2. Mid-Week Reversal:**
I originally built the entire UI in Dark Mode.
* **Reason for Change:** I realized that Credex is a financial services brand. Dark mode looked like a gaming site; Light Mode feels like a premium, trustworthy fintech tool.

**3. Week 2 Vision:**
If I had another week, I would build an "Automated Cancellation Template." After seeing the leakage, the tool would generate a ready-to-send email for the user to their AI vendor to cancel unused seats.

**4. AI Usage & Catching Mistakes:**
I used **Groq (Llama 3)** for the audit logic and **Gemini** for UI components. 
* **The Error:** An AI tool suggested disabling Supabase Row Level Security (RLS) to fix a 404 error.
* **The Catch:** I caught this as a major security flaw. Instead of disabling RLS, I wrote proper SQL policies to allow public read access for IDs that exist in the database.

**5. Self-Rating (1-10):**
* **Discipline: 9** (Shipped a working MVP with database integration in 5 days).
* **Code Quality: 8** (Functional and clean, but needs better TypeScript coverage).
* **Design Sense: 8** (The shift to Light Mode significantly improved professional feel).
* **Problem Solving: 9** (Independently resolved Vercel environment variable and params issues).
* **Entrepreneurial Thinking: 10** (Focused entirely on how this tool drives $5,000 LTV leads for the parent company).