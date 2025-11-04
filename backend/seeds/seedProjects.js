import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project.js";

dotenv.config();

const seedProjects = async () => {
  try {    
    // Nettoyage de la collection
    await Project.deleteMany({});
    console.log("🧹 Collection Project vidée.");

    // Données de test
    const projects = [
      {
        title: "Portfolio Personnel",
        description:
          "Un site complet développé avec React, Node.js et MongoDB, présentant mes projets, mon parcours et un blog technique.",
        imageUrl: "/images/portfolio.jpg",
        homepageTitle: "Mon Portfolio",
        homepageDescription: "Découvrez mes projets récents et articles techniques.",
        links: {
          github: "https://github.com/johandev/portfolio",
          website: "https://johan-portfolio.dev",
        },
        isAccueil: true,
        visibility: "public",
      },
      {
        title: "API REST de gestion de tâches",
        description:
          "Une API RESTful en Express et MongoDB pour gérer des listes de tâches avec authentification JWT et gestion des rôles.",
        imageUrl: "/images/taskapi.jpg",
        homepageTitle: "API Todo",
        homepageDescription: "Une API moderne pour vos projets de productivité.",
        links: {
          github: "https://github.com/johandev/todo-api",
          docs: ["https://api-docs-todo.dev"],
        },
        isAccueil: false,
        visibility: "public",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Un tableau de bord interactif avec React et Recharts, permettant de visualiser des données en temps réel.",
        imageUrl: "/images/dashboard.jpg",
        homepageTitle: "Dashboard",
        homepageDescription: "Visualisez vos données en un coup d’œil.",
        links: {
          github: "https://github.com/johandev/dashboard-analytics",
        },
        isAccueil: true,
        visibility: "private",
      },
      {
        title: "Blog technique Markdown",
        description:
          "Une plateforme de blog minimaliste basée sur Markdown et Node.js, avec support de l’édition en ligne.",
        imageUrl: "/images/blog.jpg",
        homepageTitle: "Blog Markdown",
        homepageDescription: "Écrivez, partagez et publiez vos idées en Markdown.",
        links: {
          github: "https://github.com/johandev/blog-markdown",
          website: "https://blog.johan.dev",
        },
        isAccueil: false,
        visibility: "public",
      },
      {
        title: "Application météo géolocalisée",
        description:
          "Une application frontend utilisant une API météo tierce, affichant les conditions actuelles selon la localisation de l’utilisateur.",
        imageUrl: "/images/meteo.jpg",
        homepageTitle: "Météo Live",
        homepageDescription: "Les prévisions en direct, où que vous soyez.",
        links: {
          github: "https://github.com/johandev/meteo-app",
        },
        isAccueil: true,
        visibility: "public",
      },
    ];

    await Project.insertMany(projects);
    console.log("✅ Projets insérés avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed des projets :", error);
  } 
};

export { seedProjects };
