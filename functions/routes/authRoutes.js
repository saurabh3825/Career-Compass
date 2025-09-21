const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "YOUR_JWT_SECRET";

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ msg: "All fields required" });

    const db = admin.firestore();
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (!snapshot.empty) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await usersRef.add({ username, email, password: hashed, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, userId: newUser.id });
  } catch (err) { res.status(500).json({ msg: "Server error" }); }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = admin.firestore();
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) return res.status(400).json({ msg: "Invalid credentials" });

    const userDoc = snapshot.docs[0];
    const data = userDoc.data();
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: userDoc.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, userId: userDoc.id });
  } catch (err) { res.status(500).json({ msg: "Server error" }); }
});

module.exports = router;
