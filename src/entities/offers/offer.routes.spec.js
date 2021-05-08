const {
  offerMock,
  orderMock,
  productOfferedMock,
  serviceOfferedMock
} = require('../../../test/mocks/models');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let businessIdStub, token;

beforeEach(async () => {
  const {
    token: tokenLogged,
    business
  } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;
  businessIdStub = business._id;
});

describe('Like a business, when visit POST "/offers"', () => {
  it('should create an offer on the database', async () => {
    const { _id: orderId, products } = await orderMock.createFake();

    const body = {
      businessId: businessIdStub,
      orderId,
      productsOffered: [
        {
          productId: products[0],
          quantity: 1,
          price: 50000
        }
      ]
    };

    await request
      .post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await offerMock.model.countDocuments()).toEqual(1);
  });

  it('should create a product offered by every product', async () => {
    const { _id: orderId, products } = await orderMock.createFake();

    const body = {
      businessId: businessIdStub,
      orderId,
      productsOffered: [
        {
          productId: products[0],
          quantity: 1,
          price: 50000
        }
      ]
    };

    await request
      .post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await productOfferedMock.model.countDocuments()).toEqual(1);
  });

  it('should create a service offered by every service', async () => {
    const { _id: orderId, services } = await orderMock.createFake();

    const body = {
      businessId: businessIdStub,
      orderId,
      servicesOffered: [
        {
          serviceId: services[0],
          price: 50000
        }
      ]
    };

    const response = await request
      .post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await serviceOfferedMock.model.countDocuments()).toEqual(1);
  });
});
