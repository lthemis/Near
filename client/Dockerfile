FROM node:18-alpine3.14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -qy
COPY . .
CMD ["npm", "start"]