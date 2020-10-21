const dashboard = require('./dashboard');
const type = require('./type');
const modules = require('./modules');
const certificate = require('./certificate');
const species = require('./species');
const remove = require('./remove');

module.exports = {
  dashboard: {
    path: '/',
    breadcrumb: 'training.dashboard',
    router: dashboard
  },
  remove: {
    path: '/:certificateId/remove',
    router: remove
  },
  type: {
    path: '/:certificateId/type',
    breadcrumb: 'training.type',
    router: type
  },
  modules: {
    path: '/:certificateId/modules',
    breadcrumb: 'training.modules',
    router: modules
  },
  certificate: {
    path: '/:certificateId/certificate',
    breadcrumb: 'training.certificate',
    router: certificate
  },
  species: {
    path: '/:certificateId/species',
    breadcrumb: 'training.species',
    router: species
  }
};
