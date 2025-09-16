import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
    {
        pdf: { type: mongoose.Schema.Types.ObjectId, ref: "Pdf", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        page: { type: Number, required: true },
        text: { type: String, required: true },
        position: { type: Object, required: true }, // bounding box
        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model("Highlight", highlightSchema);
