const Offer = require("../../db/models/offers.model");

const serviceBuilder = require("../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(Offer);

module.exports = {
    getAllOffers: getAll,
    getOffer: getOne,
    createOffer: create,
    updateOffer: update,
    removeOffer: remove
};