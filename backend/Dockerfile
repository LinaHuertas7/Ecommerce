FROM node:20

WORKDIR /var/www/backend

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .
#RUN npm init

EXPOSE 4000
#CMD [ "npm", "run", "dev" ]
