
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: API key must be obtained exclusively from process.env.API_KEY.

/**
 * Generates a 4-week module curriculum based on the topic and source data.
 * Task Category: Complex Text Tasks (reasoning, curriculum mapping).
 */
export const generateModuleCurriculum = async (topic: string, sourceData: string) => {
  // Always use the named parameter `apiKey`.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    // Use gemini-3-pro-preview for complex reasoning and structured output.
    model: 'gemini-3-pro-preview',
    contents: `You are an expert technical curriculum designer. Based on the topic "${topic}" and this source data: "${sourceData}", generate a 4-week course structure. 
    Each week should have a title, a brief description, and 3 key learning objectives.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.NUMBER },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            objectives: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["week", "title", "description", "objectives"]
        }
      }
    }
  });

  // response.text is a property, not a method.
  return JSON.parse(response.text || "[]");
};

/**
 * Reviews code snippets against security benchmarks.
 * Task Category: Complex Text Tasks (security analysis).
 */
export const reviewSecurityContent = async (codeSnippet: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Review this AI SecOps code snippet against OWASP Top 10 for LLMs. Is it safe for educational use? 
    Snippet: \`\`\`${codeSnippet}\`\`\``,
    config: {
      systemInstruction: "You are a Technical Review Agent. Your goal is to cross-reference code against security guardrails. Prohibit direct point-and-click payloads. Focus on conceptual defense."
    }
  });

  return response.text;
};
