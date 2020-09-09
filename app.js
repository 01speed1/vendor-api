require("dotenv").config();

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

const privateIO = baseIO.of("/private");

const athorizacion = require("./middlewares/athorizacionSocket");

privateIO.use(athorizacion);

module.exports.io = baseIO;
module.exports.privateIO = privateIO;

require("./sockets");

app.get("/", (r, s) => s.json({ winiie: "ok" }));

const port = process.env.NODE_PORT || 8080

server.listen(port, () => console.log(`Socket Server runnig in ${port}`));
