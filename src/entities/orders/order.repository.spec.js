const { consumerMock, orderMock } = require('../../../test/mocks/models/');
const orderRepository = require('./order.repository');

describe('#getByConsumerId', () => {
  it('should return orders with consumer ID', async () => {
    const stuffOrders = [
      await orderMock.createFake(),
      await orderMock.createFake(),
      await orderMock.createFake()
    ];

    const consumer = await consumerMock.createFake();

    const expectedOrders = [
      await orderMock.createFake({ consumerId: consumer._id }),
      await orderMock.createFake({ consumerId: consumer._id })
    ];

    const response = await orderRepository.getByConsumerId(consumer._id);

    expect(response.length).toEqual(2);
  });
});
