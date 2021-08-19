FROM node:16.7.0
WORKDIR /app
VOLUME [ "/data" ]
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 80 443
CMD [ "node", "index.js" ]