const overview = require('./overview');
const personal = require('./personal');
const details = require('./details');

module.exports = {
  overview: {
    path: '/:year',
    router: overview,
    breadcrumb: false
  },
  personal: {
    path: '/:year/pils',
    router: personal,
    breadcrumb: false
  },
  details: {
    path: '/:year/details',
    router: details,
    breadcrumb: false
  }
};
