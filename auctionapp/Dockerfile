FROM node:16 as build

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npx", "serve", "build"]


FROM nginx:alpine

#!/bin/sh

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build /opt/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
