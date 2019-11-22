const list = require('./list');
const read = require('./read');

module.exports = {
  list: {
    path: '',
    router: list
  },
  read: {
    path: '/:taskId',
    breadcrumb: false,
    router: read
  }
};
