const { io } = require("../../index");

const { getAllOrders, createOrder } = require("./orders.service");

//console.log(createOrder({ address: "ajam" }).then(console.log));

io.on("connection", client => {
  // client.emit("orders", test);

  console.log("User connected");

  client.on("get orders", response => {
    getAllOrders()
      .then(orders => response({ ok: true, orders }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create order", (parameters, response) => {
    createOrder(parameters)
      .then(order => {
        client.broadcast.emit("new orders", true);
        response({ ok: true, order })
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", () => {
    console.log("User disconnected");
  });
});
