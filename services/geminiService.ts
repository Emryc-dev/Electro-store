import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "Je suis désolé, je ne peux pas répondre pour le moment (Clé API manquante).";
  }

  try {
    const systemPrompt = `
      Tu es l'assistant virtuel intelligent de "Electro", un site e-commerce d'électronique.
      Ton ton est courtois, professionnel et serviable.
      Tu aides les utilisateurs à trouver des produits, tu expliques les méthodes de paiement (Orange Money, MTN Money, Carte Bancaire) et la politique de retour (30 jours).
      Voici le contexte actuel du magasin : ${context}
      Réponds de manière concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "Je n'ai pas compris votre demande.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue. Veuillez réessayer plus tard.";
  }
};