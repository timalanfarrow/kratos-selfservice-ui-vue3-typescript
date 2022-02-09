FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server-spa

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build
RUN rm -rf node_modules

EXPOSE 8080
CMD [ "http-server-spa", "dist", "index.html", "8080" ]
