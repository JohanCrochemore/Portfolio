import bcrypt from "bcryptjs";
import User from "../models/User.js";


const seedUsers = async () => {
  try {
    // Nettoyage de la collection
    await User.deleteMany({});
    console.log("🧹 Collection User vidée.");

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

    for (const data of users) {
      const existing = await User.findOne({ email: data.email });
      if (existing) {
        console.log(`⚠️  User already exists: ${data.email}`);
        continue;
      }
      await User.create(data);
      console.log(`✅ User created: ${data.email}`);
    }
  } catch (err) {
    console.error("❌ Error seeding users:", err);
  }
};


export { seedUsers };
