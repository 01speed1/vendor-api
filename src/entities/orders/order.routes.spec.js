const { orderMock } = require('../../../test/mocks/models/');

const { apiServerConnection } = require('../../../test/jest.helpers');
const productModel = require('../../db/models/product.model');
const serviceModel = require('../../db/models/service.model');
const categoryModel = require('../../db/models/category.model');
const subCategoryModel = require('../../db/models/subcategory.model');

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

describe('Like a consumer, when visit GET "/orders"', () => {
  it('should return all orders', async () => {
    const order1 = await orderMock.createFake({
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
      }
    });

    const order2 = await orderMock.createFake({
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
      }
    });

    const response = await request.get('/api/orders');

    const expectedResponse = JSON.stringify({
      orders: [order1, order2]
    });

    expect(response.body).toEqual(JSON.parse(expectedResponse));
  });
});

describe('Like a consumer, when visit POST "/orders"', () => {
  it('should create an order in the database', async () => {
    const { _id: categoryId } = await categoryModel.create({
      name: 'blinblon'
    });

    const { _id: subcategoryId } = await subCategoryModel.create({
      categoryId,
      name: 'ndfsb bliuvo UwU'
    });

    const body = {
      destinyAddress: {
        address: 'Calle 9 #10-93',
        neighborhood: 'Las Delicias',
        apartament: 306,
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
      services: []
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
    const { _id: categoryId } = await categoryModel.create({
      name: 'blinblon'
    });

    const { _id: subcategoryId } = await subCategoryModel.create({
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
        apartament: 306,
        additionalDescription: 'Casa con una tienda'
      },
      location: {
        lat: 40.564574,
        lon: 70.567448
      },
      products,
      services
    };

    const response = await request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(await productModel.countDocuments()).toEqual(1);
    expect(await serviceModel.countDocuments()).toEqual(1);
  });
});
