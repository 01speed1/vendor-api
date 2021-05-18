const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'id', 'created_at', '__v', /detail.*_info/];

const generateFakeData = Model => {
  return dummy(Model, {
    ignore: ignoredFields,
    returnDate: true
  });
};

const createFake = async (Model, additionalParameters) => {
  const { _id } = await Model.create({
    ...generateFakeData(Model),
    ...additionalParameters
  });

  return await Model.findById(_id).lean({ virtuals: true });
};

module.exports = Model => {
  return {
    createFake: (additionalParameters = {}) => {
      return createFake(Model, additionalParameters);
    },
    generateFakeData: () => generateFakeData(Model),
    model: Model
  };
};
