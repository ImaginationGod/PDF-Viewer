import { v4 as uuidv4 } from "uuid";
import Pdf from "../models/Pdf.js";

export const uploadPdf = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No file uploaded" });

        const pdf = await Pdf.create({
            uuid: uuidv4(),
            user: req.user,
            filename: file.originalname,
            path: file.filename,
        });

        res.status(201).json({ message: "PDF uploaded", pdf });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserPdfs = async (req, res) => {
    try {
        const pdfs = await Pdf.find({ user: req.user });

        const pdfsWithUrl = pdfs.map((pdf) => ({
            ...pdf.toObject(),
            url: `${req.protocol}://${req.get("host")}/uploads/${pdf.path}`,
        }));

        res.json(pdfsWithUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
