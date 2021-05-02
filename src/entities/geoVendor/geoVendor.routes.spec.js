const sinon = require('sinon');

const { accountHelper } = require('../../../test/helpers');

const geoVendorLib = require('../../../libs/geolocation/geoVendor');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let token, getCoordinatesStub, getAddressesStub;

beforeEach(async () => {
  const { token: tokenLogged } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;

  getCoordinatesStub = sinon.stub(geoVendorLib, 'getCoordinates');
  getAddressesStub = sinon.stub(geoVendorLib, 'getAddresses');
});

afterEach(() => {
  getCoordinatesStub.restore();
  getAddressesStub.restore();
});

describe('Like a consumer, when I visit GET "/api/geo/"', () => {
  describe('When in the params there is an address', () => {
    it('should return an address', async () => {
      const expectedResponse = {
        addresses: [
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
            administrativeLevels: {
              level1long: 'Bogotá',
              level1short: 'Bogotá'
            },
            streetNumber: '9-93',
            streetName: 'Calle 152',
            city: 'Bogotá',
            country: 'Colombia',
            countryCode: 'CO',
            zipcode: '110131',
            provider: 'google'
          }
        ]
      };

      getCoordinatesStub.returns(expectedResponse.addresses);

      const response = await request
        .get('/api/geo?address=calle%20152%20%23%209%2093')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(JSON.parse(response.text)).toEqual(expectedResponse);
    });
  });

  describe('When in the params there are coordinates', () => {
    it('should return an address', async () => {
      const expectedResponse = {
        addresses: [
          {
            formattedAddress: '3 Rue Paul Chenavard, 69001 Lyon, France',
            latitude: 45.76700930000001,
            longitude: 4.832957599999999,
            extra: {
              googlePlaceId: 'ChIJnbwS9_7q9EcR_QROzI0Rzrc',
              confidence: 1,
              premise: null,
              subpremise: null,
              neighborhood: 'Lyon',
              establishment: null
            },
            administrativeLevels: {
              level2long: 'Rhône',
              level2short: 'Rhône',
              level1long: 'Auvergne-Rhône-Alpes',
              level1short: 'Auvergne-Rhône-Alpes'
            },
            streetNumber: '3',
            streetName: 'Rue Paul Chenavard',
            city: 'Lyon',
            country: 'France',
            countryCode: 'FR',
            zipcode: '69001',
            provider: 'google'
          }
        ]
      };

      getAddressesStub.returns(expectedResponse.addresses);

      const response = await request
        .get('/api/geo?lat=45.767&lon=10.833')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(JSON.parse(response.text)).toEqual(expectedResponse);
    });
  });
});