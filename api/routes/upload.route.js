import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();


const imageSizeValidation = (req, res, next) => {
  const file = req.file;
  if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
    return res.status(400).json({ message: "File size exceeds 2MB limit" });
  }
  next();
};

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // Cloudinary folder name
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

// Image upload route
router.post("/", upload.single("file"), imageSizeValidation, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ fileUrl: req.file.path }); // Return the uploaded file URL
});

export default router;
