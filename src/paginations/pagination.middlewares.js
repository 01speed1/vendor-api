const PAGINATION_PARAMS_NAMES = ['page', 'limit', 'offset'];

const groupPaginationParams = (request, _, next) => {
  const { page = 1, limit = 10, offset = 0 } = request.query;

  request.pagination = { page, limit, offset };

  for (const name of PAGINATION_PARAMS_NAMES) {
    if (Object.hasOwnProperty.call(request.query, name)) {
      delete request.query[name];
    }
  }

  next();
};

module.exports = { groupPaginationParams };
