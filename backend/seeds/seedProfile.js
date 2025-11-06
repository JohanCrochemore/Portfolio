import Profile from "../models/Profile.js";


const seedProfile = async () => {
  try {
    // Nettoyage de la collection
    await Profile.deleteMany({});
    console.log("🧹 Collection Profile vidée.");

    const profile = [
      {
        lastName: "Crochemore",
        firstName: "Johan"       
      }    
    ];

  
    await Profile.create(profile);
    console.log(`✅ Profile created: ${profile.lastName}`);    
    } catch (err) {
    console.error("❌ Error seeding profile:", err);
    }
};


export { seedProfile };
