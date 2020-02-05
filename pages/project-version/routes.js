const read = require('./read');
const update = require('./update');

module.exports = {
  update: {
    path: '/edit',
    breadcrumb: false,
    router: update
  },
  read: {
    path: '/*',
    router: read
  }
};
