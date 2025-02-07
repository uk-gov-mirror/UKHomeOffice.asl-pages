const create = require('./apply');
const remove = require('./remove');
const namedPersonMvp = require('./named-person-mvp');

module.exports = {
  create: {
    path: '/create',
    router: create
  },
  delete: {
    path: '/remove',
    router: remove
  },
  namedPersonMvp: {
    path: '/named-person-mvp',
    router: namedPersonMvp,
    breadcrumb: 'role.namedPersonMvp.beforeYouApply'
  }
};
