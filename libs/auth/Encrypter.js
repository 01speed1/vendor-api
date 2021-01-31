const bcrypt = require('bcrypt');
const saltRounds = +process.env.AUTH_SALT;

function encrypt(passwordToEncrypt) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(passwordToEncrypt, salt);
}

function isValidPasswordAsync({ originalPassword, encryptedPassword }) {
  return bcrypt.compare(originalPassword, encryptedPassword);
}

module.exports = { encrypt, isValidPasswordAsync };
