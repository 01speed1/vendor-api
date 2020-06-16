const Order = require("./orders.model");

const getAllOrders = async () => await Order.find().exec();

const getOrder = async findOptions => await Order.findOne(findOptions).exec();

const createOrder = parameters => {
  return new Promise(async (resolve, reject) => {
    let newCategory = new Order(parameters);

    console.log("async err", newCategory.validateSync());

    if (newCategory.validateSync()) {
      reject(newCategory.validateSync());
    }

    newCategory = await newCategory.save();

    resolve(await getOrder({ _id: newCategory._id }));
  });
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder
};
