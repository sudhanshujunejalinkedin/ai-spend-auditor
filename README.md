# SpendsAudit AI
A high-performance tool to audit AI expenditures for engineering teams.

## Quick Start
1. `npm install`
2. `npm run dev`
3. Open `localhost:3000`

## Decisions & Trade-offs
1. **LocalStorage over Database:** Chosen for privacy and 0-latency persistence.
2. **Single-Page Form:** Reduced friction for higher lead capture rate.
3. **Typography-based Logo:** Removed heavy assets for faster LCP.
4. **Client-side Logic:** Ensures data never leaves user device.
5. **Tailwind Zinc Palette:** Provides a "Pro" finance feel.