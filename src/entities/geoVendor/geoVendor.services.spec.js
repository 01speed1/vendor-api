const { types, selectSearchType } = require('./geoVendor.services');

describe('#selectSearchType', () => {
  describe('When the params include latitude and longitude', () => {
    it('should return BY_COORDINATES type', () => {
      const response = selectSearchType({ lat: 45.767, lon: 4.833 });

      expect(response).toEqual(types.BY_COORDINATES);
    });

    describe('When the params include address', () => {
      it('should return BY_ADDRESS type', () => {
        const response = selectSearchType({
          address: 'calle 152 # 9 93',
          lon: 4.833
        });

        expect(response).toEqual(types.BY_ADDRESS);
      });
    });
  });
});
