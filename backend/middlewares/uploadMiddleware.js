import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Dossiers
const baseDir = path.join(process.cwd(), "uploads");
const picturesDir = path.join(baseDir, "pictures");
const documentsDir = path.join(baseDir, "documents");

// Crée les dossiers si nécessaire
[picturesDir, documentsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // On choisit le dossier en fonction du type mimetype
    if (file.mimetype.startsWith("image/")) {
      cb(null, picturesDir);
    } else {
      cb(null, documentsDir);
    }
  },
  filename: (req, file, cb) => {
    // Génération nom unique : timestamp + random 12-15 char + nom original
    const randomStr = crypto.randomBytes(8).toString("hex"); // 16 char hex
    const safeName = file.originalname.replace(/\s/g, "_");
    cb(null, `${Date.now()}-${randomStr}-${safeName}`);
  },
});

export const upload = multer({ storage });
