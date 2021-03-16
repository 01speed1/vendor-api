const {
  accountMock,
  offerMock,
  orderMock,
  productOfferedMock,
  serviceOfferedMock
} = require('../../../test/mocks/models');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let businessIdStub, token;

describe('Like a business, when visit POST "/offers"', () => {
  beforeEach(async () => {
    const {
      saveFake,
      createFakeModels,
      fakePassword
    } = accountMock.registerFake();

    const { _id: accountId, email } = await saveFake();

    const [, { _id: businessId }] = await createFakeModels(accountId);

    businessIdStub = businessId;

    const { body } = await request
      .post('/api/accounts/login')
      .send({ email, password: fakePassword });

    token = body.token;
  });

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
