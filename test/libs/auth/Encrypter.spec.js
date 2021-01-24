const {
  encrypt,
  isValidPasswordAsync
} = require('../../../libs/auth/Encrypter');

describe('#encrypt', () => {
  describe('When need encrypt a value', () => {
    it('should return the encription object', () => {
      const password = 'maisupercoolpassguortwowo';

      const response = encrypt(password);

      expect(response).toEqual(expect.any(String));
    });
  });
});

describe('#isValidPasswordAsync', () => {
  it('should compare and return if password is equivalent', async () => {
    const password = 'maisupercoolpassguortwowo';

    const encryptedPassword = encrypt(password);

    const response = await isValidPasswordAsync({
      originalPassword: password,
      encryptedPassword
    });

    expect(response).toBeTruthy();
  });
});
