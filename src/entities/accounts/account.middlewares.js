const accountRepository = require('./account.repository');

const encrypter = require('../../../libs/auth/Encrypter');

const accountExist = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const foundAccount = await accountRepository.findByEmail(email);

    if (!foundAccount) throw new Error('Incorrect email or password');

    const isCorrectPassword = await encrypter.isValidPasswordAsync({
      originalPassword: password,
      encryptedPassword: foundAccount.password
    });

    if (!isCorrectPassword) throw new Error('Incorrect email or password');

    request.account = {
      accountId: foundAccount._id,
      email: foundAccount.email
    };

    next();
  } catch (error) {
    response.status(401).json({ message: error.message });
  }
};

module.exports = { accountExist };
