FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install
RUN npm rebuild
COPY . .
CMD [ "npm", "start" ]