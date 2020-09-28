const { ParametersValidator } = require('../../../libs/validation/ParametersValidator')

const creationRules = {
  name: "string|required",
  lastName: "string|required",
  documentNumber: "string",
  contactPhones: "array",
  imagePath: "url",
}

async function creationParametersValidator(parameters) {
  return ParametersValidator(parameters, creationRules)
}

module.exports = { creationParametersValidator }