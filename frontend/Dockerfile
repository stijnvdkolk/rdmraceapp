FROM node:16
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/local/app-frontend
COPY package.json yarn.lock ./

RUN yarn install

RUN yarn global add serve

COPY . ./

RUN yarn build

EXPOSE 3000
CMD [ "serve", "-s", "build" ]
