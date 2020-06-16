const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
var cors = require("cors");

app.use(cors());

// database config
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:1q2w3e4r@ds055555.mlab.com:55555/vendor_db_1",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let server = http.createServer(app);

app.get("*", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

module.exports.io = socketIO(server);

require("./sockets");

server.listen(8080, () => console.log(`Socket Server`));
