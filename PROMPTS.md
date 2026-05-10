# LLM Prompts & Strategy

### The Core Analysis Prompt (Groq/Llama 3)
"You are a senior cloud cost auditor. Analyze the following tool: {tool}, monthly spend: ${spend}, and seats: {seats}. 
Compare this against the market-standard Pro/Team plans. 
If the spend is higher than the standard plan (e.g., $20/seat for Cursor), calculate the 'leakage'.
Output the monthly savings as a raw number and a one-sentence technical analysis."

### Why this way?
- **Zero-Shot Precision:** I avoided vague "tell me if they spend too much" and used specific constraints (raw numbers) to make it easy for the backend to parse.
- **Tone:** I used a "Senior Auditor" persona to ensure the analysis sounds authoritative on the report page.

### What didn't work?
- **Chain of Thought (CoT):** Initially, I asked the AI to "think step-by-step." This made the response too slow and often hallucinated extra text that broke my JSON parser.
- **Generalized Pricing:** AI was getting 2023 pricing data. I had to explicitly define standard pricing for tools like Cursor and ChatGPT in the system prompt to get accurate $0 vs $X savings.