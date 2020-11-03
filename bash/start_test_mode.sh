#!/bin/bash
npm i
trap 'kill 0' EXIT
docker-compose up -d &
NODE_ENV='test' nodemon --trace-warnings --unhandled-rejections=strict app.js
wait
