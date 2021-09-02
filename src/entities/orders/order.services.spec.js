const { DateTime } = require('luxon');
const { orderMock, consumerMock } = require('../../../test/mocks/models/');
const orderServices = require('./order.services');

describe('#create', () => {
  it('should create an order', async () => {
    const { _id: consumerId } = await consumerMock.createFake();
    const orderFakeData = await orderMock.generateFakeData();

    const order = {
      consumerId,
      ...orderFakeData,
      createdAt: undefined
    };

    await orderServices.create(order);

    expect(await orderMock.model.countDocuments()).toBe(1);
  });

  it('should have finishedAt correctly', async () => {
    const { _id: consumerId } = await consumerMock.createFake();
    const orderFakeData = await orderMock.generateFakeData();

    const order = {
      consumerId,
      ...orderFakeData,
      createdAt: DateTime.now(),
      hoursLeft: 2
    };

    const createdOrder = await orderServices.create(order);

    expect(createdOrder).toHaveProperty(
      'finishedAt',
      order.createdAt.plus({ hours: order.hoursLeft }).toJSDate()
    );
  });
});

describe('#buildQueryOptions', () => {
  describe('when options include priority', () => {
    it('should return the correct query', () => {
      const response = orderServices.buildQueryOptions({ priority: ['high'] });

      expect(response.finishedAt).toHaveProperty('$gte');
      expect(response.finishedAt).toHaveProperty('$lte');
    });
  });

  describe('when not include properties', () => {
    it('should return the correct query', () => {
      const response = orderServices.buildQueryOptions({});

      expect(response).toEqual({});
    });
  });
});
