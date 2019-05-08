FROM node:8-alpine

WORKDIR /home/node/

COPY ./package.json ./package.json
COPY ./yarn.lock  ./yarn.lock

RUN yarn

COPY .  .

COPY ./settings.json.example ./settings.json

CMD [ "node", "/home/node/app.js" ]