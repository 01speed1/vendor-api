require("../entities/orders/order.socket");
require("../entities/users/users.socket");
require("./auth");


// TODO: remove when we dont need this any more
// andres temp

// const { io } = require("../index");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// var ShipmentSchema = Schema({
//   from: String,
//   to: String,
//   cost: String,
//   own: {
//     name: String,
//     id: String
//   },
//   providers: [
//     {
//       user: {
//         name: String,
//         codigoAhi: String
//       },
//       cost: String
//     }
//   ],
//   createdAt: { type: Date, default: Date.now() }
// });

// const Shipment = mongoose.model("ShipmentAndres", ShipmentSchema);

// const serviceBuilder = require("../libs/serviceBuilder");

// const { getAll, getOne, update, create } = serviceBuilder(Shipment);

// let connectedUsers = {};

// io.on("connection", client => {
//   console.log("user connect", client.id);

//   client.on("connect user", user => {
//     console.log(user, "loged");
//     connectedUsers = { ...connectedUsers, [user]: client.id };
//   });

//   client.on("list shipments", response => {
//     console.log("list ship fron andres");
//     //
//     getAll()
//       .then(shipments => {
//         const allSort = shipments.sort(
//           (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
//         );

//         response({ ok: true, shipments: allSort });
//       })
//       .catch(err => {
//         response({ ok: false, err });
//       });
//   });

//   client.on("add shipment", (newShipment, response) => {
//     console.log("new shit", newShipment);
//     console.log("new ship fron andres");
//     create(newShipment)
//       .then(shipment => {
//         console.log("sdfg", shipment.createdAt.getTime());

//         return getAll();
//       })
//       .then(all => {
//         response({ ok: true });

//         const allSort = all.sort(
//           (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
//         );
//         client.broadcast.emit("lists shipments", allSort);
//       })
//       .catch(err => {
//         response({ ok: false, err });
//       });
//   });

//   // add provider
//   client.on("add offer", ({ _id, newProvider }, response) => {
//     //console.log("add offer fron andres");
//     console.log("add id", _id);
//     getOne({ _id })
//       .then(shipment => {
//         const providers = shipment.providers;

//         return update(_id, { providers: [...providers, newProvider] });
//       })
//       .then(updated => {
//         response({ ok: true, updated, newProvider });

//         console.log("users", connectedUsers);

//         client.broadcast
//           .to(connectedUsers[updated.own.name])
//           .emit("new offer", true);

//         return getAll();
//       })
//       .then(all => {
//         const allSort = all.sort(
//           (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
//         );

//         client.broadcast.emit("lists shipments", allSort);
//       })
//       .catch(err => {
//         response({ ok: false, err });
//       });
//   });
// });
