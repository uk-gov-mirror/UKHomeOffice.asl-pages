const dashboard = require('./dashboard');
const type = require('./type');
const modules = require('./modules');
const certificate = require('./certificate');
const species = require('./species');
const remove = require('./remove');

module.exports = {
  dashboard: {
    path: '/',
    permissions: 'training.update',
    router: dashboard
  },
  remove: {
    path: '/:certificateId/remove',
    router: remove
  },
  type: {
    path: '/:certificateId/type',
    router: type
  },
  modules: {
    path: '/:certificateId/modules',
    router: modules
  },
  certificate: {
    path: '/:certificateId/certificate',
    router: certificate
  },
  species: {
    path: '/:certificateId/species',
    router: species
  }
};
