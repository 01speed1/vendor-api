require('dotenv').config();

const DatabaseURLBuilder = (
  urlDB = process.env.NODE_DATABASE_URL,
  enviroment = process.env.NODE_ENV
) => {
  const url = `${urlDB}/${enviroment}DB`;

  return url;
};

module.exports = { DatabaseURLBuilder };
