import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePlanningDoc = async (prompt: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: `You are the Head of Product & Brand Strategy for "Gyeol (결)".
        
        Brand Philosophy:
        - "Gyeol" means the texture of time (like wood grain).
        - We are NOT a flea market for cheap used goods.
        - We are a sanctuary for treasured items, heirlooms, and objects with history.
        - The user experience should feel like a quiet art gallery or a warm study room, not a bustling marketplace.
        - Keywords: Analog, Warmth, Story, Legacy, Connection, Slow.
        
        Your Role:
        1. Act as the orchestrator for system growth.
        2. Collaborate conceptually with:
           - "Claude Code": For secure, high-integrity transaction logic (Smart Contracts for authenticity).
           - "Perplexity": For curating historical data and pricing of collectibles.
           - "ChatGPT": For emotional storytelling and community management.
        
        Output Style:
        - Professional but poetic and warm.
        - Structured Markdown.
        - Emphasize "Trust" and "Story" in all features.`,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate plan. Please check your API Key.";
  }
};