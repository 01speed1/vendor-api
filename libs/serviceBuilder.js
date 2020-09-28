const getAll = (Model) => () => Model.find({});

const findBy = (Model) => (parameters) => Model.find(parameters);

const getOne = (Model) => (findOptions) => Model.findOne(findOptions);

const create = (Model) => (parameters) => Model.create(parameters);

const update = (Model) => (_id, parameters) =>
  Model.findByIdAndUpdate(_id, parameters, { new: true });

const remove = (Model) => (_id) => Model.findByIdAndRemove(_id);

module.exports = (Model) => ({
  findBy: findBy(Model),
  getAll: getAll(Model),
  getOne: getOne(Model),
  create: create(Model),
  update: update(Model),
  remove: remove(Model),
});
