# Etapa 1: Construção da imagem
FROM node:18 AS build

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Executa o build da aplicação
RUN npm run build

# Etapa 2: Servir o aplicativo com Nginx
FROM nginx:alpine

# Copia os arquivos buildados do estágio de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para acesso ao conteúdo
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
