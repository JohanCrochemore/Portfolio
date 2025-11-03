import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Backend API is running fine!");
});

app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
