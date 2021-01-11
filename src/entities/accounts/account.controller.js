const accountRepository = require('./account.repository');

const signUp = async (request, response) => {
  try {
    const signUpParams = request.body;

    await accountRepository.create(signUpParams);

    response.json({
      message: 'account created'
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp
};
