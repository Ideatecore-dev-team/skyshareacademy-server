FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

COPY .env .env

EXPOSE 3000

CMD ["npm", "run", "start"]