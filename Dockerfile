FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular
RUN npm run build

# Exponha a porta padrão do Express
EXPOSE 8080

CMD ["node", "src/server.js"]