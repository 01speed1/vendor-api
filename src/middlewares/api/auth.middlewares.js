const jwt = require('express-jwt');

const { AUTH_SECRET } = process.env;

const validateJWT = () => jwt({ secret: AUTH_SECRET });

module.exports = { validateJWT };
