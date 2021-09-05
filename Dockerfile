FROM node:15.1-alpine

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
