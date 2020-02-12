const read = require('./read');
const update = require('./update');
const downloads = require('./downloads');

module.exports = {
  update: {
    path: '/edit',
    breadcrumb: false,
    router: update
  },
  downloads: {
    path: '/downloads',
    router: downloads
  },
  read: {
    path: '/*',
    router: read
  }
};
