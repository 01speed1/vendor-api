const geoVendorLib = require('../../../libs/geolocation/geoVendor');

const search = async (request, response) => {
  try {
    const { query } = request;

    const addresses = await geoVendorLib.getCoordinates(query);

    response.json({ addresses });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = { search };
