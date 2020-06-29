const express = require("express");
const io = require("socket.io");
const http = require("http");
const app = express();

const cors = require("cors");
app.use(cors());

require("./config/database");

const server = http.createServer(app);

const baseIO = io(server);
baseIO.origins("*:*");

// otro cambio

const privateIO = baseIO.of("/private");

// esto es un cambio para el repo

const athorizacion = require("./middlewares/athorizacionSocket");

privateIO.use(athorizacion);

module.exports.io = baseIO;
module.exports.privateIO = privateIO;

require("./sockets");

app.get("/", (r, s) => s.json({ winiie: "ok" }));

server.listen(process.env.PORT, () => console.log(`Socket Server`));
