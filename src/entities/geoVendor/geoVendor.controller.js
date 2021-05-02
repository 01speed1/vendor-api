const geoVendorLib = require('../../../libs/geolocation/geoVendor');
const geoVendorServices = require('./geoVendor.services');

const search = async (request, response) => {
  try {
    const { query } = request;

    const type = geoVendorServices.selectSearchType(query);

    let addresses = {};

    switch (type) {
      case geoVendorServices.types['BY_COORDINATES']:
        addresses = await geoVendorLib.getAddresses(query);
        break;

      case geoVendorServices.types['BY_ADDRESS']:
        addresses = await geoVendorLib.getCoordinates(query);
        break;

      default:
        addresses = await geoVendorLib.getCoordinates(query);
        break;
    }

    response.json({ addresses });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

module.exports = { search };
