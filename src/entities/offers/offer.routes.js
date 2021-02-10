const router = require('express').Router();

const offerController = require('./offer.controller');

router.post('/', offerController.create);

module.exports = router;
