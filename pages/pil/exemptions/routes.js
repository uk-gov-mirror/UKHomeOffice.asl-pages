const { modules, exempt } = require('./routers');

module.exports = {
  exempt: {
    path: '',
    breadcrumb: false,
    router: exempt
  },
  modules: {
    path: '/modules',
    breadcrumb: false,
    router: modules
  }
};
