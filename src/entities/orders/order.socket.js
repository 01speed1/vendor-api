const { io, privateIO } = require("../../../app");
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  removeOrder
} = require("./order.services");

io.on("connection", client => {
  client.on("get orders", response => {
    getAllOrders()
      .then(orders => response({ ok: true, orders }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("get a order", (parameters, response) => {
    getOrder(parameters)
      .then(order => response({ ok: true, order }))
      .catch(error => response({ ok: false, error }));
  });
});

privateIO.on("connection", client => {
  client.on("create order", (parameters, response) => {
    createOrder(parameters)
      .then(order => {
        client.emit("new order", response({ ok: true, order }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("update order", (_id, parameters, response) => {
    updateOrder(_id, parameters)
      .then(order => response({ ok: true, order }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("remove order", (_id, response) => {
    removeOrder(_id)
      .then(order => response({ ok: true, removed: _id }))
      .catch(error => response({ ok: false, error }));
  });
  client.on("disconnect", () => {
    console.log("a user disconnet from orders sockets");
  });
});

//
