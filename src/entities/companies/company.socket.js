const { io } = require("../../index");
const {
  getAllCompanies,
  getCompany,
  removeCompany,
  updateCompany,
  createCompany
} = require("./companies.services");

io.on("connection", client => {
  client.on("get a company", (parameters, response) => {
    getCompany(parameters)
      .then(company => response({ ok: true, company }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("get companies", response => {
    getAllCompanies()
      .then(companies => response({ ok: true, companies }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("create company", (parameters, response) => {
    createCompany(parameters)
      .then(company => {
        client.broadcast.emit("new companies", response({ ok: true, company }));
      })
      .catch(error => response({ ok: false, error }));
  });

  client.on("update company", (_id, parameters, response) => {
    updateCompany(_id, parameters)
      .then(company => response({ ok: true, company }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("remove account", (_id, response) => {
    removeCompany(_id)
      .then(account => response({ ok: true, removed: _id }))
      .catch(error => response({ ok: false, error }));
  });

  client.on("disconnect", response => {
    response({ ok: true, message: "disconnect companies" });
  });
});
