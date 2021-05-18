const {
  offerMock,
  orderMock,
  productMock,
  serviceMock,
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
    const { _id: productId } = await productMock.createFake();

    const { _id: orderId, products } = await orderMock.createFake({
      products: [productId]
    });

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

    const expectedResponse = await offerMock.model.countDocuments();

    expect(expectedResponse).toEqual(1);
  });

  it('should create a product offered by every product', async () => {
    const { _id: productId } = await productMock.createFake();

    const { _id: orderId, products } = await orderMock.createFake({
      products: [productId]
    });

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

    const expectedResponse = await productOfferedMock.model.countDocuments();

    expect(expectedResponse).toEqual(1);
  });

  it('should create a service offered by every service', async () => {
    const { _id: serviceId } = await serviceMock.createFake();

    const { _id: orderId, services } = await orderMock.createFake({
      services: [serviceId]
    });

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

    await request
      .post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    const expectedResponse = await serviceOfferedMock.model.countDocuments();

    expect(expectedResponse).toEqual(1);
  });
});
