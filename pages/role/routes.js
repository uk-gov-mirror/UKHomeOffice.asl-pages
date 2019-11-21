const create = require('./apply');
const remove = require('./remove');

module.exports = {
  create: {
    path: '/create',
    router: create
  },
  delete: {
    path: '/remove',
    router: remove
  }
};
