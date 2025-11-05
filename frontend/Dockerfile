# Étape 1 : builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json et package-lock.json pour installer les deps
COPY package*.json ./
RUN npm install

# Copier tout le code
COPY . .

# Étape 2 : container final
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

# Installer les dépendances pour le dev (tailwind, vite, etc.)
RUN npm install

# Exposer le port Vite
EXPOSE 5173

# Lancer le serveur Vite
CMD ["npm", "run", "dev"]
