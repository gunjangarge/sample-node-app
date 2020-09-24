FROM node:latest
USER root
WORKDIR /usr/src/app
COPY source/package*.json ./
RUN npm install
COPY source/* ./
RUN chgrp -R 0 ./ && \
    chmod -R g=u ./
USER node
EXPOSE 8080
CMD ["node", "server.js"]
