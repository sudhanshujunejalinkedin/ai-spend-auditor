# SpendsAudit AI

SpendsAudit AI is a dedicated financial auditing platform designed for Engineering Managers and Founders to identify, quantify, and resolve overspending on AI infrastructure within 60 seconds.

## Project Resources
- **Deployed URL:** https://ai-spend-auditor.vercel.app
- **GitHub Repository:** https://github.com/sudhanshujunejalinkedin/ai-spend-auditor

## Technical Architecture
- **Framework:** Next.js 14 (App Router)
- **Design System:** Tailwind CSS (Professional Zinc Palette)
- **Data Persistence:** LocalStorage for 100% privacy-compliant state management
- **Validation Suite:** Vitest for Audit Engine accuracy
- **Automation:** GitHub Actions for CI/CD (Linting and Automated Testing)

## Core Audit Logic and Methodology
The audit engine operates on four defensible financial vectors verified against May 2026 pricing data:
- **Seat Optimization:** Flags "Team" or "Business" plans utilized by teams below the vendor's minimum seat efficiency threshold.
- **Tier Calibration:** Identifies "Pro" or "Individual" users who are paying a retail premium instead of utilizing consolidated enterprise or business licensing.
- **Infrastructural Benchmarking:** Evaluates API consumption patterns against current market credit rates rather than standard retail pricing.
- **Vendor Comparison:** Surfaces substantially cheaper alternatives with equivalent LLM capabilities for specific use cases (e.g., Coding vs. General Research).

## Strategic Decisions and Trade-offs
1. **Local-First Architecture:** Opted for LocalStorage over a centralized database for the audit phase to ensure absolute user data privacy, a critical requirement for enterprise financial tools.
2. **High-Density Typography:** Prioritized a high-contrast monochromatic UI over heavy graphical assets to achieve a sub-500ms Largest Contentful Paint (LCP), optimizing for professional user retention.
3. **Engineered Lead Capture:** Implemented a value-first funnel where the email gate is only presented after the user has visualized their potential annual savings.
4. **Environment Resiliency:** Transitioned the CI/CD pipeline from standard wrappers to direct binary execution to resolve pathing conflicts between Windows local environments and Linux-based GitHub runners.
5. **Human-Defensible Logic:** Chose hardcoded, rule-based logic for the audit math rather than LLM-based calculations to ensure 100% financial accuracy and defensibility to CFOs.

## Installation and Local Development
1. **Clone the repository:**
   git clone https://github.com/sudhanshujunejalinkedin/ai-spend-auditor
2. **Install dependencies:**
   npm install
3. **Execute development server:**
   npm run dev
4. **Run test suite:**
   npm run test