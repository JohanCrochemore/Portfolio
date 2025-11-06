import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedUsers } from "./seeds/seedUser.js";
import { seedProjects } from "./seeds/seedProjects.js";
import { seedBlogPosts } from "./seeds/seedBlogPost.js";
import { seedSkills } from "./seeds/seedSkills.js";
import { seedProfile } from "./seeds/seedProfile.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/portfolio_db";

const seedAll = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🌱 Connected to MongoDB");

    await seedUsers();
    await seedProjects();
    await seedBlogPosts();
    await seedSkills();
    await seedProfile();

    console.log("✅ All seeds completed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }finally {
      await mongoose.disconnect();
      console.log("🔌 Déconnecté de MongoDB.");
    }  
};

seedAll();
