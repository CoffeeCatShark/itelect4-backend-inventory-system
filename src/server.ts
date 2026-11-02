
import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./db";
import itemRoutes from "./routes/itemRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import * as dns from "node:dns";
import { generateAIResponse } from "./ai/gemini";
import aiRoutes from "./routes/aiRoutes";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// API Routes
app.use("/api/items", itemRoutes);
app.use("/api/suppliers", supplierRoutes);

// Root Route
app.get("/", (_req, res) => {
    res.send("Inventory backend is running!");
});


app.use("/api/ai", aiRoutes);

// Start Server
async function startServer() {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start Express only after successful connection
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
