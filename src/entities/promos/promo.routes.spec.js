const {
  promoMock,
  subcategoryMock,
  productMock
} = require('../../../test/mocks/models');

const { accountHelper } = require('../../../test/helpers');

const { apiServerConnection } = require('../../../test/jest.helpers');
const request = apiServerConnection();

let businessIdStub, token;

beforeEach(async () => {
  const {
    token: tokenLogged,
    business
  } = await accountHelper.generateFakeLoginData();

  token = tokenLogged;
  businessIdStub = business._id;
});

describe('Like a user when visit GET "/promos"', () => {
  it('should return all promos', async () => {
    const stubProduct = await productMock.createFake();

    const stubPromos = [
      await promoMock.createFake({ products: [stubProduct._id] }),
      await promoMock.createFake(),
      await promoMock.createFake()
    ];

    const { text } = await request.get('/api/promos').expect(200);

    const response = JSON.parse(text);

    expect(response).toHaveProperty('promos');
    expect(response.promos).toHaveLength(3);
  });
});

describe('Like a business, when visit POST "/promos"', () => {
  describe('when I want to create multiple buy promo', () => {
    it('should return a multi buy promo', async () => {
      const { _id: subcategoryId } = await subcategoryMock.createFake();

      const body = {
        businessId: businessIdStub,

        products: [
          {
            subcategoryId,
            name: 'A Product name',
            quantity: 2,
            price: 30000
          }
        ],
        hoursLeft: 8,
        type: { name: 'multiBuy', multiBuy: { min: 1, get: 2 } }
      };

      await request
        .post('/api/promos')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(200);

      const expectedPromoCount = await promoMock.model.countDocuments();
      const expectedProductCount = await productMock.model.countDocuments();

      expect(expectedPromoCount).toEqual(1);
      expect(expectedProductCount).toEqual(1);
    });
  });

  describe('when I want to create discount rate promo', () => {
    it('should return discount rate promo', async () => {
      const { _id: subcategoryId } = await subcategoryMock.createFake();

      const body = {
        businessId: businessIdStub,

        products: [
          {
            subcategoryId,
            name: 'A Product name',
            quantity: 2,
            price: 30000
          }
        ],
        hoursLeft: 8,
        type: { name: 'discountRate', discountRate: 20 }
      };

      await request
        .post('/api/promos')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(200);

      const expectedPromoCount = await promoMock.model.countDocuments();
      const expectedProductCount = await productMock.model.countDocuments();

      expect(expectedPromoCount).toEqual(1);
      expect(expectedProductCount).toEqual(1);
    });
  });

  describe('when I want to create discount price promo', () => {
    it('should return discount price promo', async () => {
      const { _id: subcategoryId } = await subcategoryMock.createFake();

      const body = {
        businessId: businessIdStub,

        products: [
          {
            subcategoryId,
            name: 'A Product name',
            quantity: 2,
            price: 30000
          }
        ],
        hoursLeft: 8,
        type: { name: 'discountPrice', discountPrice: 20000 }
      };

      await request
        .post('/api/promos')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(200);

      const expectedPromoCount = await promoMock.model.countDocuments();
      const expectedProductCount = await productMock.model.countDocuments();

      expect(expectedPromoCount).toEqual(1);
      expect(expectedProductCount).toEqual(1);
    });
  });

  describe('when I want to create a free product promo', () => {
    it('should return free product promo', async () => {
      const { _id: subcategoryId } = await subcategoryMock.createFake();

      const body = {
        businessId: businessIdStub,
        products: [
          {
            subcategoryId,
            name: 'A Product name',
            quantity: 2,
            price: 30000
          }
        ],
        hoursLeft: 8,
        type: {
          name: 'freeProduct',
          freeProduct: {
            subcategoryId,
            name: 'A Product name',
            quantity: 1
          }
        }
      };

      await request
        .post('/api/promos')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(200);

      const expectedPromoCount = await promoMock.model.countDocuments();
      const expectedProductCount = await productMock.model.countDocuments();

      expect(expectedPromoCount).toEqual(1);
      expect(expectedProductCount).toEqual(2);
    });
  });
});
