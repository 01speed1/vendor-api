#!/bin/bash
npm i
trap 'kill 0' EXIT
NODE_ENV='test' nodemon --trace-warnings --unhandled-rejections=strict app.js &
sudo docker-compose up
wait
