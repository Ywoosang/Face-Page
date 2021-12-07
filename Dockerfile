FROM node:14
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json .
COPY tsconfig-build.json .
RUN npm install
COPY src ./src
RUN npm run build
RUN npm run production
