const { isObjectAddress } = require('./utils');

describe('#isObjectAddress', () => {
  describe('When options are not an object', () => {
    it('should return falsy', () => {
      expect(isObjectAddress('string')).toBeFalsy();
      expect(isObjectAddress()).toBeFalsy();
      expect(isObjectAddress(234)).toBeFalsy();
      expect(isObjectAddress(true)).toBeFalsy();
    });
  });

  describe('When options are an object', () => {
    it('should return falsy', () => {
      expect(
        isObjectAddress({
          address: 'Street false 123',
          country: 'CO',
          zipcode: '90210'
        })
      ).toBeTruthy();
    });
  });
});
