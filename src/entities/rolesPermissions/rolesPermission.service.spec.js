const { listPermissions, listRoles } = require('./rolesPermission.services');

describe('#listPermissions', () => {
  it('should convert an object of permissions in a Array', () => {
    const response = listPermissions([
      {
        role: {
          name: 'CONSUMER',
          permissions: { read: 'READ', write: 'WRITE' }
        }
      },
      {
        role: {
          name: 'BUSINESS',
          permissions: { read: 'READ', write: 'WRITE' }
        }
      }
    ]);

    expect(response).toEqual(
      expect.arrayContaining([
        'CONSUMERREAD',
        'CONSUMERWRITE',
        'BUSINESSREAD',
        'BUSINESSWRITE'
      ])
    );
  });
});

describe('#listRoles', () => {
  it('should return array of roles', () => {
    const response = listRoles([
      {
        role: { name: 'BUSINESS' }
      },
      {
        role: { name: 'CARRIER' }
      }
    ]);
    expect(response).toEqual(['BUSINESS', 'CARRIER']);
  });
});
