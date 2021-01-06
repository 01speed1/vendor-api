const State = require("../../db/models/state.model");

const serviceBuilder = require("../../libs/serviceBuilder");

const { getAll, getOne, create, update, remove } = serviceBuilder(State);

module.exports = {
    getAllStates: getAll,
    getstate: getOne,
    createState: create,
    updateState: update,
    removeState: remove
};