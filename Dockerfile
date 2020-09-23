FROM node:latest
#ENV USER_ID=1001
USER root
WORKDIR /usr/src/app
COPY source/package*.json ./
RUN npm install
COPY source/* ./
#USER ${USER_ID}
USER node
EXPOSE 8080
CMD ["node", "server.js"]
