const overview = require('./overview');

module.exports = {
  overview: {
    path: '/:year',
    router: overview,
    breadcrumb: false
  }
};
