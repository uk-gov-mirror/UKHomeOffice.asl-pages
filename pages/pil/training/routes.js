const {
  certificate,
  exempt,
  modules,
  species
} = require('./routers');

module.exports = {
  exempt: {
    path: '/exempt',
    breadcrumb: false,
    router: exempt
  },
  modules: {
    path: '/modules',
    breadcrumb: false,
    router: modules
  },
  species: {
    path: '/species',
    breadcrumb: false,
    router: species
  },
  certificate: {
    path: '',
    breadcrumb: false,
    router: certificate
  }
};
