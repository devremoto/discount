
FROM node:12-alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app

COPY package.json package-lock.json  /app/
RUN cd /app && npm set progress=false && npm install

COPY .  /app
RUN cd /app && npm run build-prod


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/frontend /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
