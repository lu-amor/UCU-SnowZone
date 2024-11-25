FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install && npm install bulma react-router-dom @mdi/react @mdi/js
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]