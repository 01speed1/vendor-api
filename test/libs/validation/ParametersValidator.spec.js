const {
  ParametersValidator,
} = require('../../../libs/validation/ParametersValidator');

describe('ParametersValidator', () => {
  const requiredParamers = {
    name: 'Faker TheRed Dragon',
    number: 343445523,
    email: 'faker@mail.com',
    password: 'imnotfaker',
    password_confirmation: 'imnotfaker',
  };

  const requiredRules = {
    name: 'string|required',
    number: 'integer|required',
    email: 'email|required',
    password: 'alpha_dash|required|confirmed',
    password_confirmation: 'alpha_dash',
  };

  describe('when receive parametes and rules', () => {
    it('should return a promise', () => {
      const response = ParametersValidator(requiredParamers, requiredRules);

      expect(response).toEqual(expect.any(Promise));
    });
  });

  describe('when receive parametes, rules and the promise is resolved', () => {
    it('should return the params', async () => {
      const response = await ParametersValidator(
        requiredParamers,
        requiredRules
      );

      expect(response).toEqual(requiredParamers);
    });
  });

  describe('when receive parametes, rules and the promise is rejected', () => {
    it('should return the errors', () => {
      const expectedErrorsObject = {
        email: ['The email field is required.'],
        name: ['The name field is required.'],
        number: ['The number field is required.'],
        password: ['The password field is required.'],
      };

      ParametersValidator({}, requiredRules).catch((errors) => {
        expect(errors).toEqual(expectedErrorsObject);
      });
    });
  });
});
