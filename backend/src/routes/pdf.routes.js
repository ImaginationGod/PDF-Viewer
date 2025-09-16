import { Router } from "express";
import multer from "multer";
import { uploadPdf, getUserPdfs } from "../controllers/pdf.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const storage = multer.diskStorage({
    destination: "src/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("pdf"), uploadPdf);
router.get("/", protect, getUserPdfs);

export default router;
