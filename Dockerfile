FROM node:15.1-alpine

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]
