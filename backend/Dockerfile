# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps separately to leverage Docker layer caching
COPY package*.json ./
RUN npm install --production=false

# Copy the rest of the backend source
COPY . .

ENV NODE_ENV=development \
    PORT=5001

EXPOSE 5001

CMD ["node", "server.js"]


