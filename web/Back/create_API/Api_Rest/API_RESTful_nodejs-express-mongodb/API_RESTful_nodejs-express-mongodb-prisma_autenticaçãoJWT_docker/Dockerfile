# Use a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma

# Instala as dependências
RUN npm install
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["npm", "start"]