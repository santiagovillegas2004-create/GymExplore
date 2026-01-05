
import { GoogleGenAI } from "@google/genai";
import { WorkoutSession } from "./types";

export const getWorkoutInsights = async (history: WorkoutSession[]): Promise<string> => {
  // Creamos la instancia dentro de la función para usar la API_KEY más actual
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyText = history.slice(-5).map(w => {
    return `Fecha: ${w.date}, Grupos: ${w.muscleGroups.join(', ')}, Ejercicios: ${w.exercises.length}`;
  }).join('\n');

  const prompt = `
    Actúa como un entrenador personal experto. Analiza este historial reciente de entrenamientos y dame un consejo breve, motivador y técnico en español (máximo 50 palabras) sobre cómo mejorar.
    
    Historial:
    ${historyText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "¡Buen trabajo! Sigue así.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Sigue entrenando fuerte!";
  }
};
