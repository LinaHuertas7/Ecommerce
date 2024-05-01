FROM node:20

WORKDIR /var/www/frontend

COPY package*.json ./

RUN npm install

COPY . .
#RUN npm init

EXPOSE 3000
#CMD [ "npm", "run", "dev" ]
