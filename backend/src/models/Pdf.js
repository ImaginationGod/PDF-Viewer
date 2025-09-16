import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
    {
        uuid: { type: String, required: true, unique: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        filename: { type: String, required: true },
        path: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);
