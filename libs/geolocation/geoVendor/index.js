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
  let foundCoordinates = [];

  try {
    if (geoVendorUtils.isObjectAddress(addressOptions)) {
      const { address, country, zipcode } = addressOptions;

      foundCoordinates = await geocoder.geocode({ address, country, zipcode });
    }

    foundCoordinates = await geocoder.geocode(addressOptions);

    return foundCoordinates;
  } catch (error) {
    return foundCoordinates;
  }
};

const getAddresses = async ({ lat, lon }) => {
  let foundAddress = [];

  try {
    foundAddress = await geocoder.reverse({ lat, lon });

    return foundAddress;
  } catch (error) {
    return foundAddress;
  }
};

module.exports = { getCoordinates, getAddresses, geocoder };
