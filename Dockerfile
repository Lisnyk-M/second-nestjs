FROM node:13-alpine

WORKDIR /code

ENV RUN_WITH_DOCKER true

COPY package.json /code/package.json

RUN npm install 
#--legacy-peer-deps

COPY . /code

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]