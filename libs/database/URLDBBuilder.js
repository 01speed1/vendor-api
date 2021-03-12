require('dotenv').config();

const { NODE_DATABASE_URL, NODE_ENV } = process.env;

const DatabaseURLBuilder = (
  urlDB = NODE_DATABASE_URL,
  environment = NODE_ENV
) => {
  const url = `${urlDB}/${environment}DB`;

  return url;
};

module.exports = { DatabaseURLBuilder };
