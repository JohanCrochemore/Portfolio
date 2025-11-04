import mongoose from "mongoose";
import dotenv from "dotenv";
import BlogPost from "../models/BlogPost.js";

dotenv.config();

const seedBlogPosts = async () => {
  try {
    // Nettoyage de la collection
    await BlogPost.deleteMany({});
    console.log("🧹 Collection BlogPost vidée.");

    // Données de test
    const blogPosts = [
      {
        title: "Optimiser les performances d’un site React",
        content: `
          Dans cet article, je partage plusieurs techniques d’optimisation 
          pour les applications React, telles que la mémorisation des composants, 
          le lazy loading et la compression des assets. L’objectif est de réduire 
          le temps de chargement et d’améliorer l’expérience utilisateur.
        `,
        status: "published",
        publishDate: new Date("2025-10-12T10:00:00Z"),
      },
      {
        title: "Comprendre les bases de MongoDB pour les développeurs web",
        content: `
          MongoDB est une base de données NoSQL orientée documents. 
          Découvrez comment modéliser vos données, gérer les relations, 
          et tirer parti des schémas dynamiques avec Mongoose dans vos projets Node.js.
        `,
        status: "published",
        publishDate: new Date("2025-10-30T09:00:00Z"),
      },
      {
        title: "Mise en place d’une API REST sécurisée avec Express et JWT",
        content: `
          Un guide complet sur la création d’une API REST en Node.js avec Express, 
          la gestion de l’authentification par JWT, et les bonnes pratiques pour 
          protéger vos routes et vos données utilisateurs.
        `,
        status: "draft",
        publishDate: new Date("2025-11-20T12:00:00Z"),
      },
      {
        title: "Déployer une application MERN sur Render",
        content: `
          Ce tutoriel décrit étape par étape comment déployer une application 
          complète MERN (MongoDB, Express, React, Node) sur Render, 
          en configurant les variables d’environnement et les build commands.
        `,
        status: "published",
        publishDate: new Date("2025-11-01T08:00:00Z"),
      },
      {
        title: "Créer un design système avec TailwindCSS",
        content: `
          Apprenez à structurer et maintenir un design system évolutif 
          avec TailwindCSS. Nous aborderons la configuration du thème, 
          la gestion des couleurs, et la création de composants réutilisables.
        `,
        status: "draft",
        publishDate: new Date("2025-12-05T14:00:00Z"),
      },
    ];

    await BlogPost.insertMany(blogPosts);
    console.log("✅ Blog posts insérés avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed des blog posts :", error);
  } 
};

export { seedBlogPosts };
