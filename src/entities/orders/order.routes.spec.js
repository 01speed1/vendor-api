const { DateTime } = require('luxon');
const {
  orderMock,
  productMock,
  serviceMock,
  categoryMock,
  subcategoryMock
} = require('../../../test/mocks/models/');

const { apiServerConnection } = require('../../../test/jest.helpers');

const { accountHelper } = require('../../../test/helpers');

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

describe('Like a guest, when visit GET "/orders"', () => {
  it('should return the orders without sensible data', async () => {
    const { _id: productId } = await productMock.createFake();
    const { _id: serviceId } = await serviceMock.createFake();

    await orderMock.createFake({
      products: [productId],
      services: [serviceId]
    });

    const response = await request.get('/api/orders').expect(251);

    const {
      body: { orders }
    } = response;

    const order = orders[0];

    expect(order).not.toHaveProperty('consumerId');
    expect(order.destinyAddress).not.toHaveProperty('neighborhood');
    expect(order.destinyAddress).not.toHaveProperty('apartment');
    expect(order.destinyAddress).not.toHaveProperty('additionalDescription');
    expect(order).not.toHaveProperty('status');
    expect(order).not.toHaveProperty('modifiedAt');
  });

  it('should return product or service like objects', async () => {
    const product1 = await productMock.createFake();
    const service1 = await serviceMock.createFake();

    await orderMock.createFake({
      products: [product1._id],
      services: [service1._id]
    });

    const {
      body: { orders }
    } = await request
      .get('/api/orders')
      .set('Authorization', `Bearer `)
      .expect(251);

    const products = orders[0].products;
    const services = orders[0].services;

    expect(products[0]).toEqual(expect.any(Object));
    expect(services[0]).toEqual(expect.any(Object));
  });

  it('should permit pagination query params', async () => {
    await orderMock.createFake();

    const response = await request
      .get('/api/orders?limit=10&page=1')
      .set('Authorization', ``)
      .expect(251);

    expect(response.body).toHaveProperty('orders');
  });

  describe('When the user needs filter by priority', () => {
    it('should return the orders with the filter by high priority', async () => {
      const now = DateTime.local().plus({ minutes: 10 });

      const product1 = await productMock.createFake();

      await orderMock.createFake({
        products: [product1._id],
        createdAt: now,
        finishedAt: now.plus({ hours: 1 })
      });

      await orderMock.createFake({ products: [product1._id] });

      const response = await request
        .get(`/api/orders?priority[]=high`)
        .expect(251);

      expect(response.body.orders.length).toBe(1);
    });

    it('should return the orders with the filter by all priorities', async () => {
      const now = DateTime.local().plus({ minutes: 10 });

      const product1 = await productMock.createFake();

      await orderMock.createFake({
        products: [product1._id],
        createdAt: now,
        finishedAt: now.plus({ hours: 10 })
      });

      await orderMock.createFake({ products: [product1._id] });

      const priorityParams = ['low', 'medium', 'high'];

      const response = await request
        .get(
          `/api/orders?&priority[]=${priorityParams[0]}&priority[]=${priorityParams[1]}&priority[]=${priorityParams[2]}`
        )
        .expect(251);

      expect(response.body.orders.length).toBe(1);
    });
  });

  describe('When the bearer is empty', () => {
    it('should return code 251', async () => {
      await request.get('/api/orders').expect(251);
    });
  });
});

describe('Like a consumer, when visit GET "/orders"', () => {
  it('should return all orders', async () => {
    const { _id: productId } = await productMock.createFake();
    const { _id: serviceId } = await serviceMock.createFake();

    await orderMock.createFake({
      consumerId: consumerIdStub,
      destinyAddress: {
        address: 'Calle 9 #10-93',
        neighborhood: 'Las Delicias',
        apartament: 306,
        additionalDestination: 'Casa con una tienda'
      },
      location: {
        lat: 40.564574,
        lon: 70.567448
      },
      products: [productId, serviceId],
      services: [productId, serviceId]
    });

    await orderMock.createFake({
      products: [productId, serviceId],
      services: [productId, serviceId]
    });

    const response = await request
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.orders.length).toEqual(2);

    expect(response.body).toHaveProperty('hasNextPage');
    expect(response.body).toHaveProperty('hasPrevPage');
    expect(response.body).toHaveProperty('limit');
    expect(response.body).toHaveProperty('nextPage');
    expect(response.body).toHaveProperty('offset');
    expect(response.body).toHaveProperty('page');
    expect(response.body).toHaveProperty('pagingCounter');
    expect(response.body).toHaveProperty('prevPage');
    expect(response.body).toHaveProperty('totalDocs');
    expect(response.body).toHaveProperty('totalPages');

    expect(response.body.orders[0]).toHaveProperty('finishedAt');
  });

  it('should return product or service like objects', async () => {
    const product1 = await productMock.createFake();
    const service1 = await serviceMock.createFake();

    await orderMock.createFake({
      products: [product1._id],
      services: [service1._id]
    });

    const {
      body: { orders }
    } = await request
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const products = orders[0].products;
    const services = orders[0].services;

    expect(products[0]).toEqual(expect.any(Object));
    expect(services[0]).toEqual(expect.any(Object));
  });

  describe('When the user needs filter by priority', () => {
    it('should return the orders with the filter by high priority', async () => {
      const now = DateTime.local().plus({ minutes: 10 });

      const product1 = await productMock.createFake();

      await orderMock.createFake({
        products: [product1._id],
        createdAt: now,
        finishedAt: now.plus({ hours: 1 })
      });

      await orderMock.createFake({ products: [product1._id] });

      const response = await request
        .get(`/api/orders?priority[]=high`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.orders.length).toBe(1);
    });
  });
});

describe('Like a consumer, when visit POST "/orders"', () => {
  it('should create an order in the database', async () => {
    const { _id: categoryId } = await categoryMock.createFake({
      name: 'blinblon'
    });

    const { _id: subcategoryId } = await subcategoryMock.createFake({
      categoryId,
      name: 'ndfsb bliuvo UwU'
    });

    const body = {
      destinyAddress: {
        address: 'Calle 9 #10-93',
        neighborhood: 'Las Delicias',
        apartment: 306,
        additionalDescription: 'Casa con una tienda'
      },
      location: {
        lat: 40.564574,
        lon: 70.567448
      },
      products: [
        {
          subcategoryId: subcategoryId,
          name: 'Product name',
          quantity: 1
        }
      ],
      services: [],
      hoursLeft: 8
    };

    const response = await request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);

    expect(response.body).toEqual({ message: 'Order created' });

    const expectedResponse = await orderMock.model.countDocuments();

    expect(expectedResponse).toEqual(1);
  });

  it('should create product and services in the database', async () => {
    const { _id: categoryId } = await categoryMock.createFake({
      name: 'blinblon'
    });

    const { _id: subcategoryId } = await subcategoryMock.createFake({
      categoryId,
      name: 'ndfsb bliuvo UwU'
    });

    const products = [
      {
        subcategoryId: subcategoryId,
        name: 'Product name',
        quantity: 1,
        price: 40000
      }
    ];
    const services = [
      {
        subcategoryId: subcategoryId,
        name: 'Product name',
        description: 'bli bla blo',
        price: 40000
      }
    ];

    const body = {
      destinyAddress: {
        address: 'Calle 9 #10-93',
        neighborhood: 'Las Delicias',
        apartment: 306,
        additionalDescription: 'Casa con una tienda'
      },
      location: {
        lat: 40.564574,
        lon: 70.567448
      },
      products,
      services,
      hoursLeft: 8
    };

    const response = await request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(await productMock.model.countDocuments()).toEqual(1);
    expect(await serviceMock.model.countDocuments()).toEqual(1);
  });

  describe(' When dont send neighborhood', () => {
    it('should return an error', async () => {
      const { _id: categoryId } = await categoryMock.createFake({
        name: 'blinblon'
      });

      const { _id: subcategoryId } = await subcategoryMock.createFake({
        categoryId,
        name: 'ndfsb bliuvo UwU'
      });

      const body = {
        destinyAddress: {
          address: 'Calle 9 #10-93',
          apartment: 306,
          additionalDescription: 'Casa con una tienda'
        },
        location: {
          lat: 40.564574,
          lon: 70.567448
        },
        products: [
          {
            subcategoryId: subcategoryId,
            name: 'Product name',
            quantity: 1
          }
        ],
        services: [],
        hoursLeft: 8
      };

      const response = await request
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(400);

      expect(response.body.validation.body.message).toEqual(
        '"destinyAddress.neighborhood" is required'
      );
    });
  });

  describe(' When dont send product name', () => {
    it('should return an error', async () => {
      const { _id: categoryId } = await categoryMock.createFake({
        name: 'blinblon'
      });

      const { _id: subcategoryId } = await subcategoryMock.createFake({
        categoryId,
        name: 'ndfsb bliuvo UwU'
      });

      const body = {
        destinyAddress: {
          address: 'Calle 9 #10-93',
          neighborhood: 'Las Delicias',
          apartment: 306,
          additionalDescription: 'Casa con una tienda'
        },
        location: {
          lat: 40.564574,
          lon: 70.567448
        },
        products: [
          {
            subcategoryId: subcategoryId,
            quantity: 1
          }
        ],
        services: [],
        hoursLeft: 8
      };

      const response = await request
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(400);

      expect(response.body.validation.body.message).toEqual(
        '"products[0].name" is required'
      );
    });
  });
});
