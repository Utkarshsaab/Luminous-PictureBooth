
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImageVibe = async (imageUrl: string, title: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `I am looking at a photo titled "${title}". 
          Please generate a short, poetic 2-sentence story about this scene and a 3-word "vibe" tag.
          Return it in JSON format.`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            story: { type: Type.STRING },
            vibe: { type: Type.STRING }
          },
          required: ["story", "vibe"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      story: "The image holds a quiet secret, waiting for the right moment to be told. A silent witness to the beauty of the world.",
      vibe: "Ethereal • Timeless • Calm"
    };
  }
};
