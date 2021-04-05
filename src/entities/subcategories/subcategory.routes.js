const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');

const subcategoryController = require('./subcategory.controller');

router.post('/', apiMiddleware.validateJWT, subcategoryController.create);

module.exports = router;
