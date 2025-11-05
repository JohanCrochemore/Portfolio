import User from "../models/User.js";


const seedUsers = async () => {
  try {
    // Nettoyage de la collection
    await User.deleteMany({});
    console.log("🧹 Collection User vidée.");

    const users = [
      {
        name: "Dev",       
        email: "johan@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Demo",
        email: "demo@example.com",
        password: "demo123",
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
