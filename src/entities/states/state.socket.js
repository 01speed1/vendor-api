const { io } = require("../../index");
const { getAllStates, createState } = require("./state.services");

io.on("connection", client => {
  client.on("get states", response => {
    getAllStates()
      .then(state => response({ ok: true, state }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create state", (parameters, response) => {
    createState(parameters)
      .then(state => {
        client.broadcast.emit("new state", response({ ok: true, state }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", response => {
    response({ ok: true, message: "disconnect" });
  });
});
