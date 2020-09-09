const DEFAULT_URL_DB = 'mongodb://localhost:27017/localDB'

const DatabaseURLBuilder = (
  urlDB = process.env.NODE_DATABASE_URL,
  enviroment = process.env.NODE_ENV
) => {

  const shouldCreateOtherUrl = !!urlDB && !!enviroment

  const url = `${urlDB}/vendor_${enviroment}DB`

  return shouldCreateOtherUrl ? url : DEFAULT_URL_DB
}

module.exports = { DatabaseURLBuilder }