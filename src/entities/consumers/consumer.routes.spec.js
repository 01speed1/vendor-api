const { accountMock, orderMock } = require('../../../test/mocks/models/');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let consumerIdStub, token;

beforeEach(async () => {
  const {
    saveFake,
    fakePassword,
    createFakeModels
  } = accountMock.registerFake();

  const { _id: accountId, email } = await saveFake();

  const [consumer, business, carrier] = await createFakeModels(accountId);

  consumerIdStub = consumer._id;

  const { body } = await request
    .post('/api/accounts/login')
    .send({ email, password: fakePassword });

  token = body.token;
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

    console.log(JSON.stringify(response.body, null, 2));

    expect(response.body.orders.length).toEqual(2);
  });
});
