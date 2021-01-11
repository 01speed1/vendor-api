const accountModel = require('../../db/models/account.model');
const consumerModel = require('../../db/models/consumer.model');
const orderModel = require('../../db/models/order.model');
const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

describe('Like a consumer, when visit "/orders"', () => {
  it('should return all orders', async () => {
    const createdAccount = await accountModel.create({
      email: 'skatin@mail.com',
      password: 'bloblu',
      lastName: 'MyPresident',
      firstName: 'Skatin'
    });

    const createdConsumer = await consumerModel.create({
      accountId: createdAccount._id
    });

    const order1 = await orderModel.create({
      consumerId: createdConsumer._id,
      destinyAddress: 'calle falsa 123',
      location: 'po ahia'
    });

    const order2 = await orderModel.create({
      consumerId: createdConsumer._id,
      destinyAddress: 'calle falsa 456',
      location: 'po ahia'
    });

    const response = await request.get('/api/orders');

    const expectedResponse = JSON.stringify({
      orders: [order1, order2]
    });

    expect(response.body).toEqual(JSON.parse(expectedResponse));
  });
});
