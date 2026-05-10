# METRICS.md

### 1. The North Star Metric
**Audits Completed per Unique User.**
* **Why:** For a lead-gen tool, retention isn't the goal—trust is. If a user audits their Cursor spend and then immediately audits their ChatGPT or Midjourney spend, it signifies high trust and utility.

### 2. Input Metrics (The Drivers)
1. **Landing Page Conversion Rate:** The percentage of visitors who click "Start Your Free Audit".
2. **Report Share Rate:** Percentage of users who copy the public URL to their clipboard.
3. **CTA Click-Through (Consultation):** Percentage of users who click "Book a Credex Consultation" after seeing their savings.

### 3. Instrumentation Plan
We will first instrument **PostHog event tracking** on the `generate-report` button and the `copy-link` button. This allows us to see exactly where users drop off in the form.

### 4. The Pivot Trigger
If the **Consultation Booking Rate** stays below **0.5%** after the first 500 audits, we will pivot. This would indicate the tool is seen as a "fun toy" rather than a "business necessity." The pivot would involve adding a "One-Click Subscription Cancellation" feature to make the value proposition more "pain-killing".