const types = {
  BY_ADDRESS: 'BY_ADDRESS',
  BY_COORDINATES: 'BY_COORDINATES'
};

const selectSearchType = searchParams => {
  const type = types.BY_ADDRESS;

  const { lat, lon, address } = searchParams;

  if (lat && lon) return types.BY_COORDINATES;

  if (address) return types.BY_ADDRESS;

  return type;
};

module.exports = {
  types,
  selectSearchType
};
