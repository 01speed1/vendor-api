const accountModel = require('../../db/models/account.model');
const consumerModel = require('../../db/models/consumer.model');
const orderModel = require('../../db/models/order.model');

const accountMock = require('../../../test/mocks/models/account.mock');

const { apiServerConnection } = require('../../../test/jest.helpers');
const productModel = require('../../db/models/product.model');
const serviceModel = require('../../db/models/service.model');
const categoryModel = require('../../db/models/category.model');
const subCategoryModel = require('../../db/models/subcategory.model');
const request = apiServerConnection();

let createdAccount, createdConsumer, token;

beforeEach(async () => {
  createdAccount = await accountModel.create({
    email: 'skatin@mail.com',
    password: 'bloblu',
    lastName: 'MyPresident',
    firstName: 'Skatin'
  });

  createdConsumer = await consumerModel.create({
    accountId: createdAccount._id
  });

  const { saveFake, createFakeModels, fakePassword } = accountMock.registerFake(
    {
      email: 'fake@man.com'
    }
  );

  const { _id: accountId, email } = await saveFake();
  await createFakeModels(accountId);

  const { body } = await request
    .post('/api/accounts/login')
    .send({ email, password: fakePassword });

  token = body.token;
});

describe('Like a consumer, when visit GET "/orders"', () => {
  it('should return all orders', async () => {
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

describe('Like a consumer, when visit POST "/orders"', () => {
  it('should create an order in the database', async () => {
    const body = {
      location: 'this should be a location object',
      destinyAddress: 'cll false 123',
      products: [
        {
          subcategory: 'subcategory',
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

    expect(response.body).toEqual({ message: 'order created' });

    expect(await orderModel.countDocuments()).toEqual(1);
  });

  fit('should create product and services in the database', async () => {
    const { _id: categoryId } = await categoryModel.create({
      name: 'blinblon'
    });

    const { _id: subcategoryId } = await subCategoryModel.create({
      categoryId,
      name: 'ndfsb bliuvo UwU'
    });

    const products = [
      {
        subcategory: subcategoryId,
        name: 'Product name',
        quantity: 1,
        price: 40000
      }
    ];
    const services = [
      {
        subcategory: subcategoryId,
        name: 'Product name',
        description: 'bli bla blo',
        price: 40000
      }
    ];

    const body = {
      location: 'la casa de jose',
      destinyAddress: 'la otra casa de jose',
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
