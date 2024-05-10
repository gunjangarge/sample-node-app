FROM node:latest
USER root
WORKDIR /usr/src/app
COPY source/package*.json ./
RUN npm install
COPY source/* ./
RUN wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 -O /usr/local/bin/mkcert && chmod +x /usr/local/bin/mkcert && mkcert ssl
RUN chgrp -R 0 ./ && \
    chmod -R g=u ./
EXPOSE 8080
EXPOSE 8443
CMD ["node", "server.js"]
