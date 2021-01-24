const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/];

const generateFakeData = Model => {
  return dummy(Model, {
    ignore: ignoredFields,
    returnDate: true
  });
};

const createFake = (Model, additionalParameters) => {
  return Model.create({
    ...generateFakeData(Model),
    ...additionalParameters
  });
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
