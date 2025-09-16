import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import highlightRoutes from "./routes/highlight.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/highlights", highlightRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../client/dist");
    app.use(express.static(frontendPath));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("PDF Annotator API is running...");
    });
}

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
