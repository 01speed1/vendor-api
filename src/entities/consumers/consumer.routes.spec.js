const { orderMock, productMock } = require('../../../test/mocks/models/');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let consumerIdStub, token;

beforeEach(async () => {
  const {
    token: tokenLogged,
    consumer
  } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;
  consumerIdStub = consumer._id;
});

describe('Like a consumer, when I visit "/api/consumer/orders"', () => {
  it('should return the orders of consumer', async () => {
    const offersStuff = [
      await orderMock.createFake(),
      await orderMock.createFake(),
      await orderMock.createFake()
    ];

    const consumerOrders = [
      await orderMock.createFake({ consumerId: consumerIdStub }),
      await orderMock.createFake({ consumerId: consumerIdStub })
    ];

    const response = await request
      .get('/api/consumers/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.orders.length).toEqual(2);
  });
});

describe('Like a consumer, when I visit "/api/consumer/orders/:id"', () => {
  it('should return an order', async () => {
    const productsIds = [
      await productMock.createFake({ consumerId: consumerIdStub }),
      await productMock.createFake({ consumerId: consumerIdStub })
    ].map(product => product._id);

    const { _id: orderId } = await orderMock.createFake({
      consumerId: consumerIdStub,
      products: productsIds
    });

    const response = await request
      .get(`/api/consumers/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.order).toHaveProperty('_id');
  });

  describe('When the order have different consumer owner', () => {
    it('should return not found', async () => {
      const offersStuff = [await orderMock.createFake()];

      const productsIds = [
        await productMock.createFake({ consumerId: consumerIdStub }),
        await productMock.createFake({ consumerId: consumerIdStub })
      ].map(product => product._id);

      await orderMock.createFake({
        consumerId: consumerIdStub,
        products: productsIds
      });

      const response = await request
        .get(`/api/consumers/orders/${offersStuff[0]['_id']}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.order).toEqual(null);
    });
  });
});
