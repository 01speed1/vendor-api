const { io } = require("../index");

const { userRegister } = require("../libs/register");
const { userSession } = require("../libs/session");

io.on("connection", client => {
  client.on("signup", (parameters, response) => {
    console.log("signing up ...");
    userRegister(parameters)
      .then(token => {
        response({ ok: true, token });
      })
      .catch(fail => {
        response({ ok: false, errors: fail });
      });
  });

  client.on("signin", (parameters, response) => {
    console.log("signing in ...");

    userSession(parameters)
      .then(token => response({ ok: true, token }))
      .catch(fail => response({ ok: false, fail }));
  });
});
