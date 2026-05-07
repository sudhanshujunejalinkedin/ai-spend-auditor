# Tests Documentation

All tests are written using **Vitest** to ensure the Audit Engine's mathematical logic is defensible and accurate.

## Test Files
| Filename | Coverage | Run Command |
| :--- | :--- | :--- |
| `audit.test.ts` | Core Audit Engine Logic (Seats, Plans, Savings) | `npm test` |

## Scenarios Covered
1. **Low Seat Inefficiency:** Validates that users on "Team" plans with fewer than 3 seats are flagged for a downgrade to "Pro".
2. **Optimal Spend Check:** Ensures that users already on the most cost-effective plan for their seat count show $0 savings (No manufactured savings).
3. **Retail Benchmark Verification:** Checks if the user's reported monthly spend exceeds the official vendor pricing (e.g., paying >$20/mo for a Cursor Pro seat).
4. **Scale Detection:** Validates that high API spends (> $1,000/mo) correctly trigger the "Enterprise/Credex" logic.
5. **Multi-Tool Accuracy:** Ensures logic holds across different vendors (OpenAI, Anthropic, Cursor) based on their specific pricing tiers.

## How to Run Tests
1. Install dependencies:
   ```bash
   npm install