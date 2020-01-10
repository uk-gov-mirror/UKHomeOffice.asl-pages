const overview = require('./overview');
const personal = require('./personal');

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
  }
};
