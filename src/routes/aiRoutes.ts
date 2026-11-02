import { Router } from "express";
import { chatRequestSchema } from "../schemas/chat";
import { generateAIResponse } from "../ai/gemini";

const router = Router();

router.post("/chat", async (req, res) => {
    try {
        // 1. Validate the incoming request
        const validation = chatRequestSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: "Invalid chat request.",
                errors: validation.error.issues
            });
            return;
        }

        const { message, history } = validation.data;

        // 2. Convert conversation history into Gemini format
        const contents = [
            ...history.map((entry) => ({
                role: entry.role,
                parts: [{ text: entry.content }]
            })),
            {
                role: "user" as const,
                parts: [{ text: message }]
            }
        ];

        // 3. Generate Gemini response
        const response = await generateAIResponse(contents);

        // 4. Return the response
        res.json({
            success: true,
            response
        });

    } catch (error) {
        console.error("Chat API Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate AI response."
        });
    }
});

export default router;