FROM node:16
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/local/app-backend
COPY package.json yarn.lock ./

RUN apt-get install g++ gcc libstdc++ libc6 make python
RUN npm install -g node-gyp rimraf

RUN yarn install

RUN npm_config_build_from_source=true yarn add argon2

COPY . ./
RUN yarn prisma:generate:local

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
