const read = require('./read');
const update = require('./update');
const downloads = require('./downloads');
const pdf = require('./pdf');
const docx = require('./docx');
const convert = require('./convert');
const ppl = require('./ppl');

module.exports = {
  update: {
    path: '/edit',
    breadcrumb: false,
    router: update
  },
  convert: {
    path: '/convert',
    router: convert
  },
  downloads: {
    path: '/downloads',
    router: downloads
  },
  pdf: {
    path: '/pdf',
    router: pdf
  },
  ntsPdf: {
    path: '/pdf/nts',
    router: pdf
  },
  docx: {
    path: '/docx',
    router: docx
  },
  ppl: {
    path: '/ppl',
    router: ppl
  },
  read: {
    path: '/*',
    router: read
  }
};
