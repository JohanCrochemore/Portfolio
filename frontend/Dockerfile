FROM node:20-alpine

WORKDIR /app

# Copier uniquement package.json pour installer les dépendances
COPY package*.json ./
RUN npm install

# Exposer le port de développement
EXPOSE 3000

# Lancer le serveur de dev
CMD ["npm", "start"]
