FROM node:16-alpine3.15 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build



FROM node:16-alpine3.15 AS prod

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=deps /app/build ./build

COPY --from=deps /app/.env ./

CMD [ "node","build/index.js" ]