import Skills from "../models/Skills.js";


const seedSkills = async () => {
  try {
    // Nettoyage de la collection
    await Skills.deleteMany({});
    console.log("🧹 Collection Skills vidée.");

    const skills = [
      {
        name: "PHP"       
      },
      {
        name: "React" 
      },
      {
       name: "SQL" 
      },
      {
       name: "MongoDB" 
      },
      {
       name: "Javascript" 
      },
      {
       name: "Docker" 
      },
      {
       name: "Laravel" 
      },
      {
       name: "Node" 
      },
    ];

    for (const data of skills) {
      const existing = await Skills.findOne({ name: data.name });
      if (existing) {
        console.log(`⚠️  Skills already exists: ${data.name}`);
        continue;
      }
      await Skills.create(data);
      console.log(`✅ Skills created: ${data.name}`);
    }
  } catch (err) {
    console.error("❌ Error seeding skills:", err);
  }
};


export { seedSkills };
