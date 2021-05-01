const sinon = require('sinon');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

const geoVendorLib = require('../../../libs/geolocation/geoVendor');

let token, getCoordinatesStub;

beforeEach(async () => {
  const { token: tokenLogged } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;

  getCoordinatesStub = sinon.stub(geoVendorLib, 'getCoordinates');
});

afterAll(() => {
  getCoordinatesStub.restore();
});

describe('Like a consumer, when I visit GET "/api/geo/"', () => {
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
          administrativeLevels: { level1long: 'Bogotá', level1short: 'Bogotá' },
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
