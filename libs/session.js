const jwt = require("jsonwebtoken");

const { getAccount } = require("../src/entities/accounts/account.services");
const { getUser } = require("../src/entities/users/user.services");

module.exports.userSession = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    let foundAccount = await getAccount({ email, password });

    if (!foundAccount) {
      reject("Usuario no encontrado, o malas credenciales");
    } else {
      const userAccount = await getUser({ _id: foundAccount.owner });

      const payload = {
        account: {
          account_id: foundAccount._id,
          ...userAccount._doc
        },
        timestap: new Date().getTime(),
        expireIn: 60 * 60 * 24
      };

      const token = jwt.sign(payload, process.env.SECRET);
      resolve(token);
    }
  });
};
