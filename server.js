const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Hubungkan route dari file routes/auth.js
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes); // prefix: /api

// Static file (optional)
app.use(express.static("public"));

// GET ALL USERS (testing)
app.get("/api/users", async (req, res) => {
  const users = await User.find({}, "username -_id");
  res.json(users);
});

// ✅ Tambahkan route ini biar bisa tampil di web
app.get("/", (req, res) => {
  res.send("🚀 Secure API is running successfully on Railway!");
});

// Jalankan server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
