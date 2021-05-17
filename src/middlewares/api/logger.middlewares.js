const morgan = require('morgan');
const logger = require('../../../libs/logger');

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development' || env !== 'test';
};

const stream = { write: message => logger.http(message) };

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

module.exports = { morganMiddleware };
