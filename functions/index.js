

const functions = require("firebase-functions");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios"); // to call Gemini API
const admin = require("firebase-admin");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
exports.api = functions.https.onRequest(app);

const upload = multer({ storage: multer.memoryStorage() });

app.post("/resume/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    // Upload file to Firebase Storage
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`resumes/${Date.now()}-${file.originalname}`);
    await fileRef.save(file.buffer, { contentType: file.mimetype });

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

    // Call Gemini API for career analysis
    const geminiResponse = await axios.post(
      "https://gemini.example.com/analyze", // replace with real endpoint
      { resumeUrl: fileUrl }
    );

    const redirectUrl = geminiResponse.data.redirectUrl; // Gemini gives a recommended URL

    // Respond with resume URL and Gemini redirect
    res.json({
      fileUrl,
      analysis: geminiResponse.data.analysis,
      redirectUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

exports.api = functions.https.onRequest(app);
