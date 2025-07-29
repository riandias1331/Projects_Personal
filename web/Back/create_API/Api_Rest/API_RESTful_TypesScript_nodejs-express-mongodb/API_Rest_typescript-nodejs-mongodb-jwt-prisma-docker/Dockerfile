# Escolhe a imagem base oficial do Node.js
FROM node:latest 


# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY package*.json ./

# Remove a pasta node_modules se existir, para evitar conflitos
RUN rm -rf node_modules
# Instala as dependências do projeto
RUN npm install 

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Expõe a porta que a aplicação irá utilizar
EXPOSE 3333