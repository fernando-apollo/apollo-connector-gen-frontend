FROM node:20-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY .env.docker .env
COPY . .

EXPOSE 3000
ENV BACKEND_URL 'http://generator:8080'

CMD [ "npm", "run", "dev", "--host" ]
