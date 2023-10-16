FROM node:20-alpine AS BUILD_IMAGE

RUN apk update && apk add --no-cache curl bash && rm -rf /var/cache/apk/*

ARG APP_DIR=/application

WORKDIR $APP_DIR

COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# build application
RUN yarn build

FROM node:20-alpine

WORKDIR /application

COPY package.json ./

ENV NODE_PATH=./build

# copy from build image
COPY --from=BUILD_IMAGE /application/dist ./dist
COPY --from=BUILD_IMAGE /application/node_modules ./node_modules

EXPOSE 80

ENTRYPOINT ["yarn", "start:prod"]
