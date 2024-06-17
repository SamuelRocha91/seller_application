FROM registry.docker.com/library/node:21.6.2-alpine

RUN apk add --no-cache \
  build-base \
  git \
  vips-dev \
  curl

WORKDIR /seller-app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host" ]