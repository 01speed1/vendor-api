let Validator = require('validatorjs');

function ParametersValidator(parameters, rules) {
  return new Promise( (resolve, reject) => {
    const validation = new Validator(parameters, rules)

    if(validation.fails()) {
      reject(validation.errors.all())
    } else {
      resolve(parameters)
    }

  })
}

module.exports = { ParametersValidator }