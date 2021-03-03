FROM node:alpine3.10

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-script -g --unsafe-perm
RUN npm install mic-recorder-to-mp3
RUN npm install axios
RUN npm install react-minimal-side-navigation
RUN mkdir /app/node_modules/.cache

COPY . .

CMD ["npm", "start"]
