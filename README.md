# SpendsAudit AI

A high-performance, privacy-first tool designed for Engineering Leaders to audit and optimize their AI tool expenditures in under 60 seconds.

## 🔗 Project Links
- **Live Demo:** https://ai-spend-auditor-5ym99d3pz.vercel.app

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Zinc Palette)
- **State Management:** React Hooks + LocalStorage
- **Testing:** Vitest
- **CI/CD:** GitHub Actions.

## Decisions & Trade-offs
1. **LocalStorage over Database:** Chosen for 100% user privacy and zero-latency persistence. Audit data never leaves the user's device.
2. **Single-Page Dynamic Dashboard:** Removed multi-step friction to maximize lead capture and user retention.
3. **Typography-based Branding:** Utilized a high-contrast Zinc palette and Lucide icons instead of heavy assets to ensure a sub-500ms Largest Contentful Paint (LCP).
4. **Defensible Audit Engine:** Every recommendation is backed by manually verified May 2026 pricing data, ensuring financial accuracy.
5. **Credex Integration:** Strategic placement of the "Connect Credex" surface for users with high-scale AI spend ($500+).

## Core Audit Logic
The system evaluates four primary vectors:
- **Seat Inefficiency:** Detecting "Team" plans with fewer than the required minimum seats.
- **Tier Mismatch:** Flagging individual "Pro" users who should be on consolidated business plans.
- **Scale Benchmarking:** Identifying high API consumers eligible for secondary market credits.
- **Retail vs. Optimization:** Comparing current spend against official Q2 2026 vendor benchmarks.

## Quick Start
1. **Clone & Install:**
   ```bash
   git clone [Your Repo Link]
   cd ai-spend-auditor
   npm install