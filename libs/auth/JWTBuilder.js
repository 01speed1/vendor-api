var jwt = require("jsonwebtoken");
var validate = require("validate.js");

function JWTBuilder(payload = {}) {

  return new Promise( (resolve, reject) => {

    if(validate.isEmpty(payload)) return reject({ error: "payload no found to create token" })

    const updatedPayload = {
      ...payload,
      timestap: new Date().getTime(),
      expireIn: 60 * 60 * 24
    }

    const token = jwt.sign(updatedPayload, process.env.JWT_SECRET)

    if(!token) return reject({ error: "the token could be created" })


    resolve({token})
  })
}

module.exports = { JWTBuilder }