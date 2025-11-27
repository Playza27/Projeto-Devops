# Use uma imagem base do Node.js
FROM node:20-slim

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que o app de desenvolvimento usa
EXPOSE 3000

# O React Scripts inicia um servidor de desenvolvimento
CMD ["npm", "start"]