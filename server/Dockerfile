FROM node:18-alpine3.14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -qyg nodemon@^2.0.15
RUN npm install -qy
COPY . .
CMD ["npm", "server"]