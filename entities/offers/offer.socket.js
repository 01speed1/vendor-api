const { io } = require("../../index");

const {
  getAllOffers,
  getOffer,
  createOffer,
  updateOffer,
  removeOffer
} = require("./offers.service");

io.on("connection", client => {
  client.on("get a offer", (parameters, response) => {
    getOffer(parameters)
      .then(offer => response({ ok: true, offer }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("get offers", response => {
    getAllOffers()
      .then(offers => response({ ok: true, offers }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create offer", (parameters, response) => {
    createOffer(parameters)
      .then(offer => {
        client.broadcast.emit("new offers", response({ ok: true, offer }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("update offer", (_id, parameters, response) => {
    updateOffer(_id, parameters)
      .then(offer => response({ ok: true, offer }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("remove offer", (_id, response) => {
    removeOffer(_id)
      .then(offer => response({ ok: true, removed: _id }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", response => {
    response({ ok: true, message: "disconnect offers" });
  });
});
