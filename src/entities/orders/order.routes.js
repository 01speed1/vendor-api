const router = require('express').Router();

const orderController = require('./order.controller');

router.get('/', orderController.getAll);

module.exports = router;
