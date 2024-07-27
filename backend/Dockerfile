FROM node:18.17.1
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV SERVER_PORT 8085
EXPOSE $SERVER_PORT
CMD [ "npm","run","start" ]
