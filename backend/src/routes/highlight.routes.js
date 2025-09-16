import { Router } from "express";
import { addHighlight, getHighlights, deleteHighlight } from "../controllers/highlight.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, addHighlight);
router.get("/:pdfId", protect, getHighlights);
router.delete("/:id", protect, deleteHighlight);

export default router;
