const { io } = require("../../index");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser
} = require("./users.services");

io.on("connection", client => {
  client.on("get a user", (parameters, response) => {
    console.log(parameters);
    getUser(parameters)
      .then(user => response({ ok: true, user }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("get users", response => {
    getAllUsers()
      .then(users => response({ ok: true, users }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create user", (parameters, response) => {
    createUser(parameters)
      .then(user => {
        client.emit("new user", response({ ok: true, user }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("update user", (_id, parameters, response) => {
    updateUser(_id, parameters)
      .then(user => response({ ok: true, user }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("remove user", (_id, response) => {
    removeUser(_id)
      .then(user => response({ ok: true, removed: _id }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", () => {
    console.log("a user disconnet from users sockets");
  });
});
