FROM node:latest

LABEL org.opencontainers.image.source https://github.com/mzrimsek/packet-parser-server

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]