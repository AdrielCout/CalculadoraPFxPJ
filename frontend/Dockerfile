FROM node:20-alpine

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 5173

# --host 0.0.0.0 é obrigatório para o Vite ser acessível fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
