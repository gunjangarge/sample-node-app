FROM node:latest
#ENV USER_ID=1001
USER root
WORKDIR /usr/src/app
COPY source/package*.json ./
RUN npm install
COPY source/* ./
RUN chgrp -R 0 ./ && \
    chmod -R g=u ./
RUN mkdir logs
#USER ${USER_ID}
USER node
EXPOSE 8080
CMD ["node", "server.js"]
