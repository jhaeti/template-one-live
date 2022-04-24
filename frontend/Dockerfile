FROM node:16.3.0-alpine3.11

WORKDIR /frontend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY .next .next
COPY public public

EXPOSE 3000

CMD npm start