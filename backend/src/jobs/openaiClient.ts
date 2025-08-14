import OpenAI from "openai";

// OpenAI Integration for Veritas.O Growth Engine
// Uncomment and configure this when ready to use real OpenAI API

export async function askGPTReal(system: string, user: string): Promise<string> {
  const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  try {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2, // Low temperature for reproducible results
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      max_tokens: 4000 // Adjust based on needs
    });

    return response.choices?.[0]?.message?.content || "";
    
  } catch (error) {
    console.error("[OpenAI] API call failed:", error);
    throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Usage: Replace the mock askGPT function in runGrowthEngine.ts with this:
// import { askGPTReal as askGPT } from "./openaiClient";

export const openAIConfig = {
  // Recommended models for different tasks
  models: {
    research: "gpt-4o", // For complex research and analysis
    synthesis: "gpt-4o-mini", // For synthesis and summarization
    fast: "gpt-3.5-turbo" // For quick processing
  },
  
  // Temperature settings for different agent types
  temperatures: {
    analytical: 0.1, // AEGIS, SENTINEL - precise analysis
    creative: 0.3, // LYRA, VESTA - creative synthesis
    balanced: 0.2, // JUNO, MIRRA - balanced reasoning
    exploratory: 0.4 // Research and discovery tasks
  },
  
  // Token limits by complexity
  tokenLimits: {
    simple: 1000,
    detailed: 2000,
    comprehensive: 4000
  }
};

// Enhanced error handling and retry logic
export async function askGPTWithRetry(
  system: string, 
  user: string, 
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await askGPTReal(system, user);
    } catch (error) {
      console.warn(`[OpenAI] Attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error("Max retries exceeded");
}
