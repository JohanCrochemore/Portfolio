import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Upload single file
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // URL relative pour accéder depuis le frontend
  const fileUrl = `/uploads/${req.file.mimetype.startsWith("image/") ? "pictures" : "documents"}/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;
