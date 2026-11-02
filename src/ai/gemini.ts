import { GoogleGenAI, Content } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";
import { getInventoryContext } from "./inventoryContext";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateAIResponse(
    contents: Content[]
) {
    const inventory = await getInventoryContext();

    const inventoryContext = JSON.stringify(inventory, null, 2);

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
            systemInstruction: `
                ${SYSTEM_PROMPT}

                Here is the current inventory data from MongoDB:

                ${inventoryContext}

                Use this data when answering questions about
                actual items and suppliers.
            `
        },
    });

    return response.text;
}