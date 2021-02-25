const accountMock = require('../../../test/mocks/models/account.mock');
const accountRepository = require('./account.repository');

describe('#create', () => {
  it('should save an account in the database', async () => {
    const data = accountMock.generateFakeData();

    await accountRepository.create(data);

    expect(await accountMock.model.countDocuments()).toEqual(1);
  });
});

describe('#update', () => {
  it('should update the account on the database', async () => {
    const createdAccount = await accountMock.createFake();

    const response = await accountRepository.update({
      id: createdAccount._id,
      email: 'bli@Blob.com'
    });

    expect(response.value.email).toEqual('bli@Blob.com');
  });
});
