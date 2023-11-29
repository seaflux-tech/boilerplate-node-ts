FROM node:14-alpine3.12

RUN npm install pm2 -g

WORKDIR /app

COPY *.json ./

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]