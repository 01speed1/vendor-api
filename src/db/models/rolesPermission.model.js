const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

const {
  PERMISSIONS,
  ROLES
} = require('../../entities/rolesPermissions/rolesPermission.constants');

var RolesPermissionSchema = Schema({
  accountId: { type: OID, ref: 'Account', required: true },
  role: {
    name: { type: String, required: true, enum: Object.values(ROLES) },
    permissions: [
      {
        type: String,
        enum: Object.values(PERMISSIONS)
      }
    ]
  }
});

const RolesPermission = mongoose.model(
  'RolesPermission',
  RolesPermissionSchema
);

module.exports = RolesPermission;
