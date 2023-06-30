FROM node:18-alpine
# RUN mkdir -p /usr/src/app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]