FROM node:latest 

WORKDIR /API_RESTful_nodejs-express-mongodb-prisma_autenticaçãoJWT_docker

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3333


CMD ["node", "main.js"]