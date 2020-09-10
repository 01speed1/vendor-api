#!/bin/bash
npm i

trap 'kill 0' EXIT
NODE_ENV='development' nodemon app.js --trace-warnings &
sudo docker-compose up -d
wait

