FROM node:latest

ENV APP_HOME /vendor-api

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME/

COPY ./package*.json /$APP_HOME/

RUN npm config set unsafe-perm true

RUN npm install -g npm

RUN npm install

CMD ["/bin/bash"]