const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "YOUR_JWT_SECRET";
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try { req.userId = jwt.verify(token, JWT_SECRET).userId; next(); }
  catch { res.status(401).json({ msg: "Invalid token" }); }
};

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", auth, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
    const bucket = admin.storage().bucket();
    const blob = bucket.file(`resumes/${Date.now()}-${req.file.originalname}`);
    const stream = blob.createWriteStream({ metadata: { contentType: req.file.mimetype, metadata: { firebaseStorageDownloadTokens: uuidv4() } }});
    stream.end(req.file.buffer);

    const analysis = { strengths: ["Problem Solving"], suggestedCareers: ["Software Engineer"], nextSteps: ["Learn React"] };
    res.json({ msg: "Resume uploaded", fileUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`, analysis });
  } catch { res.status(500).json({ msg: "Server error" }); }
});

module.exports = router;
