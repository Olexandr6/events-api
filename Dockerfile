FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY /prisma ./prisma
COPY /src ./src
 

RUN npx prisma generate
RUN npm run build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]