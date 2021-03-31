FROM node:latest

ENV APP_HOME /vendor-api
RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME/

COPY ./package*.json /$APP_HOME/

RUN npm install

RUN npm install -g npm

CMD ["/bin/bash"]