const overview = require('./overview');
const download = require('./download');

module.exports = {
  overview: {
    path: '/:year',
    router: overview,
    breadcrumb: false
  },
  download: {
    path: '/:year/download',
    router: download,
    breadcrumb: false
  }
};
