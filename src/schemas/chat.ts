import { z } from "zod";

export const chatRequestSchema = z.object({
    message: z
        .string()
        .trim()
        .min(1, "Message cannot be empty.")
        .max(2000, "Message is too long."),

    history: z
        .array(
            z.object({
                role: z.enum(["user", "model"]),
                content: z.string().min(1).max(2000)
            })
        )
        .max(20)
        .default([])
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;