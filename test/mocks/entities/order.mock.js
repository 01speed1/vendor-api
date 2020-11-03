var faker = require("faker");

const Order = require("../../../src/db/models/order.model");

const defaultArgumets = () => ({
    location: {
        type: "Point",
        coordinates: [faker.random.number(), faker.random.number()],
    },
    address: faker.address.direction(),
    products: [faker.commerce.productName(), faker.commerce.productName()],
    services: [faker.commerce.productName(), faker.commerce.productName()],
    deliverDetails: faker.lorem.paragraph(),
});

module.exports = async function userMocker(args) {
    return await Order.create({...defaultArgumets(), ...args });
};