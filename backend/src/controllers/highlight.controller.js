import Highlight from "../models/Highlight.js";

export const addHighlight = async (req, res) => {
    try {
        const { pdfId, page, text, position } = req.body;

        const highlight = await Highlight.create({
            pdf: pdfId,
            user: req.user,
            page,
            text,
            position
        });

        res.status(201).json(highlight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHighlights = async (req, res) => {
    try {
        const { pdfId } = req.params;
        const highlights = await Highlight.find({ pdf: pdfId, user: req.user });
        res.json(highlights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHighlight = async (req, res) => {
    try {
        const highlight = await Highlight.findOneAndDelete({
            _id: req.params.id,
            user: req.user,
        });
        if (!highlight) return res.status(404).json({ message: "Highlight not found" });
        res.json({ message: "Highlight deleted", id: highlight._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
