const read = require('./read');
const update = require('./update');

module.exports = {
  read: {
    path: '/',
    router: read,
    breadcrumb: false
  },
  update: {
    path: '/update',
    router: update,
    breadcrumb: false
  }
};
