const JWT = require('./JWT');

describe('#create', () => {
  describe('When the developer need a json web token', () => {
    it('should be created with the right params', async () => {
      const payload = {
        email: 'somemail@mail.com'
      };

      const responseToken = JWT.create(payload);

      expect(responseToken).toEqual(expect.any(String));
    });

    describe('when payload does not exist', () => {
      it('should create a token', () => {
        const responseToken = JWT.create();

        expect(responseToken).toEqual(expect.any(String));
      });
    });
  });
});
