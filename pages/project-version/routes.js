const read = require('./read');
const update = require('./update');
const downloads = require('./downloads');
const pdf = require('./pdf');
const docx = require('./docx');

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
  pdf: {
    path: '/pdf',
    router: pdf
  },
  docx: {
    path: '/docx',
    router: docx
  },
  read: {
    path: '/*',
    router: read
  }
};
