FROM node:15.1-alpine

WORKDIR /usr/app

COPY . .

# RUN yarn install --production --ignore-scripts --prefer-offline
RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]
