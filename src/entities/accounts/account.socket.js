const { io } = require("../../index");
const {
  getAccount,
  getAllAccounts,
  createAccount,
  updateAccount,
  removeAccount
} = require("./account.services");

io.on("connection", client => {
  client.on("get a account", (parameters, response) => {
    getAccount(parameters)
      .then(account => response({ ok: true, account }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("get accounts", response => {
    getAllAccounts()
      .then(accounts => response({ ok: true, accounts }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create account", (parameters, response) => {
    createAccount(parameters)
      .then(account => {
        client.emit("new account", response({ ok: true, account }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("update account", (_id, parameters, response) => {
    updateAccount(_id, parameters)
      .then(account => response({ ok: true, account }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("remove account", (_id, response) => {
    removeAccount(_id)
      .then(account => response({ ok: true, removed: _id }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", response => {
    response({ ok: true, message: "disconnect" });
  });
});
