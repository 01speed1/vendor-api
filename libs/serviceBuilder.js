const getAll = (Model) => async () => Model.find({});

const findBy = (Model) => async (parameters) => {
  return await Model.find(parameters);
};

const getOne = (Model) => async (findOptions) => {
  try {
    return await Model.findOne(findOptions);
  } catch (errors) {
    return errors;
  }
};

const create = (Model) => async (parameters) => await Model.create(parameters);

const update = (Model) => async (_id, parameters) =>
  await Model.findByIdAndUpdate(_id, parameters, { new: true }).exec();

const remove = (Model) => async (_id) => await Model.findByIdAndRemove(_id);

module.exports = (Model) => ({
  findBy: findBy(Model),
  getAll: getAll(Model),
  getOne: getOne(Model),
  create: create(Model),
  update: update(Model),
  remove: remove(Model),
});
