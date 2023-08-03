FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

VOLUME /app/data

ENV CSV_PATH /app/data/names.txt

CMD ["yarn", "start"]
