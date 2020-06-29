const getAll = Model => async () => await Model.find().exec();
const getOne = Model => async findOptions =>
  await Model.findOne(findOptions).exec();

const create = Model => async parameters => {
  const newInstace = new Model(parameters);

  return newInstace.save();
};

module.exports = Model => ({
  getAll: getAll(Model),
  getOne: getOne(Model), //async findOptions => await Model.findOne(findOptions).exec(),
  create: create(Model),
  update: async (_id, parameters) =>
    await Model.findOneAndUpdate({ _id }, parameters, { new: true }).exec(),
  remove: async _id => await Model.findOneAndRemove({ _id })
});
