import { GoogleGenAI } from "@google/genai";

let genAI: any = null;

export const getGemini = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const chatWithAssistant = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const ai = getGemini();
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are the EcoPulse India Sustainable Living Assistant. 
  You provide personalized, actionable, and encouraging advice for a more sustainable lifestyle specifically in the Indian context. 
  Focus on local solutions like using clay pots (matkas) for cooling, traditional composting, switching to LEDs, and using public transport like the Metro or local buses.
  Keep your responses minimalist, professional, and sophisticated.
  Prices should be discussed in ₹ (INR).
  Always speak with a tone of modern luxury tech: precise, polished, and visionary.`;

  const response = await ai.models.generateContent({
    model,
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: { systemInstruction }
  });

  return response.text;
};
