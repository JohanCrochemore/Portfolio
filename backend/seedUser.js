import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/portfolio_db";

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const users = [
      {
        name: "Johan Dev",
        email: "johan@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        name: "Demo User",
        email: "demo@example.com",
        password: await bcrypt.hash("demo123", 10),
        role: "demo",
      },
    ];

    for (const userData of users) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`User already exists: ${userData.email}`);
        continue;
      }
      await User.create(userData);
      console.log(`User created: ${userData.email}`);
    }

    console.log("✅ Seeding done.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedUsers();
