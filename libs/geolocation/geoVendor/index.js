const NodeGeocoder = require('node-geocoder');
const geoVendorUtils = require('./utils');

const { GOOGLE_MAPS_API_KEY } = process.env;

const options = {
  httpAdapter: 'https',
  provider: 'google',
  apiKey: GOOGLE_MAPS_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

const getCoordinates = async addressOptions => {
  let foundAddresses = [];

  try {
    if (geoVendorUtils.isObjectAddress(addressOptions)) {
      const { address, country, zipcode } = addressOptions;
      foundAddresses = await geocoder.geocode({ address, country, zipcode });
    }

    foundAddresses = await geocoder.geocode(addressOptions);

    return foundAddresses;
  } catch (error) {
    return foundAddresses;
  }
};

module.exports = { getCoordinates, geocoder };
