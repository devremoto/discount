FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
ARG port=5000
ENV DB_URL "mongodb://ft-mongodb:27017/productdb"
ENV PORT $port

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $port
CMD [ "npm", "start" ]