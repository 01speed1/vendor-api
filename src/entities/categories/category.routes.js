const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api/');

const categoryController = require('./category.controller');

router.post('/', apiMiddleware.validateJWT, categoryController.create);

module.exports = router;
