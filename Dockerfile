FROM node:15.1-alpine

WORKDIR /app

# note the leading `.` on the copied filename
COPY ./env ./.env
COPY . .

ARG APP_INSIGHTS_KEY
ARG APP_VERSION

ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION

RUN yarn install
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
