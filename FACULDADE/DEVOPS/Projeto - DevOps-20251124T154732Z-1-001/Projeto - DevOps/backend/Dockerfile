# Use uma imagem base do Node.js
FROM node:20-slim

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que o app usa
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]