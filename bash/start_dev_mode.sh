#!/bin/bash
npm i

trap 'kill 0' EXIT
NODE_ENV='development' nodemon --trace-warnings --unhandled-rejections=strict app.js &
sudo docker-compose up -d
wait

