const { DatabaseURLBuilder } = require('./URLDBBuilder');

describe('When need to build a URL DB Path', () => {
  beforeEach(() => {
    process.env.NODE_DATABASE_URL = 'mongodb://localhost:27018';
    process.env.NODE_ENV = 'test';
  });

  test('should return the DB Path', () => {
    expect(DatabaseURLBuilder()).toEqual('mongodb://localhost:27017/testDB');
  });

  describe('when the function use params', () => {
    test('should return the DB Path', () => {
      expect(DatabaseURLBuilder('mongodb://localhost:27017', 'test')).toEqual(
        'mongodb://localhost:27017/testDB'
      );
    });
  });
});
