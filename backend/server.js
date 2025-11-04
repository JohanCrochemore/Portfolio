import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import blogPostRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogposts", blogPostRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Backend API is running fine!");
});

app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
