const sinon = require('sinon');
const geoVendor = require('.');

let geocodeStub;

beforeEach(() => {
  geocodeStub = sinon.stub(geoVendor.geocoder, 'geocode');
});

afterEach(() => {
  geocodeStub.restore();
});

describe('#getCoordinates', () => {
  describe('When address is a string', () => {
    it('should return coordinates', async () => {
      const expectedResponse = [
        {
          formattedAddress: 'Cl. 152 #9-93, Bogotá, Colombia',
          latitude: 4.730390499999999,
          longitude: -74.03485479999999,
          extra: {
            googlePlaceId: 'ChIJlztCWWGFP44RDFhDZaDyFNM',
            confidence: 1,
            premise: null,
            subpremise: null,
            neighborhood: 'Usaquén',
            establishment: null
          },
          administrativeLevels: { level1long: 'Bogotá', level1short: 'Bogotá' },
          streetNumber: '9-93',
          streetName: 'Calle 152',
          city: 'Bogotá',
          country: 'Colombia',
          countryCode: 'CO',
          zipcode: '110131',
          provider: 'google'
        }
      ];

      geocodeStub.returns(expectedResponse);

      const response = await geoVendor.getCoordinates('calle 152 # 9 93');

      expect(response).toEqual(expectedResponse);
    });
  });

  describe('When address is a object', () => {
    it('should return coordinates', async () => {
      const expectedResponse = [
        {
          formattedAddress: 'Ac. 100, Bogotá, Colombia',
          latitude: 4.6877608,
          longitude: -74.05836889999999,
          extra: {
            googlePlaceId: 'ChIJYRvUdMGaP44ROluVIxEed8Y',
            confidence: 0.7,
            premise: null,
            subpremise: null,
            neighborhood: 'Bogotá',
            establishment: null
          },
          administrativeLevels: { level1long: 'Bogotá', level1short: 'Bogotá' },
          streetName: 'Avenida Calle 100',
          city: 'Bogotá',
          country: 'Colombia',
          countryCode: 'CO',
          provider: 'google'
        }
      ];

      geocodeStub.returns(expectedResponse);

      const response = await geoVendor.getCoordinates({
        address: 'calle 100 con autopista norte',
        country: 'colombia',
        zipcode: null
      });

      expect(response).toEqual(expectedResponse);
    });
  });
});
