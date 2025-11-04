FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# Copie script wait
COPY wait-for-mongo.sh ./wait-for-mongo.sh
RUN chmod +x ./wait-for-mongo.sh

EXPOSE 5000

# Seed et start après MongoDB ready
CMD ["sh", "-c", "./wait-for-mongo.sh mongo node seedDatas.js && npm run start"]
