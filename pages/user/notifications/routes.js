const list = require('./list');
const read = require('./read');

module.exports = {
  list: {
    path: '/',
    breadcrumb: false,
    router: list
  },
  read: {
    path: '/:notificationId',
    breadcrumb: false,
    router: read
  }
};
