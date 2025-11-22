import { GoogleGenAI } from "@google/genai";
import { DATA } from "../constants";

export const generateResearchResponse = async (userQuery: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I'm sorry, but I haven't been configured with an API key yet. Please tell the site administrator to set the API_KEY environment variable.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct a context based on the website data
  const context = JSON.stringify({
    profile: DATA.profile,
    publications: DATA.publications.map(p => ({
      title: p.title,
      year: p.year,
      venue: p.venue,
      abstract: p.abstract,
      authors: p.authors
    })),
    teaching: DATA.teaching
  });

  try {
    const prompt = `You are an intelligent research assistant for ${DATA.profile.name}. 
              Use the following JSON data describing the professor's CV, publications, and teaching to answer the user's question.
              
              Data:
              ${context}
              
              Rules:
              1. Be professional, academic, yet approachable.
              2. If the answer isn't in the data, say you don't know but suggest looking at the publications page.
              3. Keep answers concise (under 150 words) unless asked for a detailed summary.
              4. If asked about specific papers, cite the title and year.
              
              User Question: ${userQuery}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while thinking about your question. Please try again later.";
  }
};
