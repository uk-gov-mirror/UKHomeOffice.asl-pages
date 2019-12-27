const overview = require('./overview');
const personal = require('./personal');

module.exports = {
  overview: {
    path: '/overview',
    router: overview,
    breadcrumb: false
  },
  personal: {
    path: '/personal',
    router: personal,
    breadcrumb: false
  }
};
