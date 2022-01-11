FROM node:16
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/local/app-frontend
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
