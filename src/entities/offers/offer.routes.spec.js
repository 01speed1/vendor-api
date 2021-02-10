const {
  accountMock,
  offerMock,
  orderMock
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
    const { _id: orderId } = await orderMock.createFake();

    const body = {
      businessId: businessIdStub,
      orderId
    };

    const response = await request
      .post('/api/offers')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(await offerMock.model.countDocuments()).toEqual(1);
  });
});
