var jwt = require("jsonwebtoken");

const { createAccount } = require("../entities/accounts/account.services");
const { createUser, getUser } = require("../entities/users/users.services");

module.exports.userRegister = async ({ email, password, name, lastName }) => {
  const newUser = await createUser({ name, lastName });

  const newAccount = await createAccount({
    email,
    password,
    owner: newUser._id
  });

  const userAccount = await getUser({ _id: newAccount.owner });

  const payload = {
    account: {
      account_id: newAccount._id,
      ...userAccount._doc
    },
    timestap: new Date().getTime(),
    expireIn: 60 * 60 * 24
  };

  return jwt.sign(payload, process.env.SECRET);
};
