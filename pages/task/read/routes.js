const { extend, confirm, read, discard, deadlinePassed, endorse } = require('./routers');
const raAwerb = require('./ra-awerb');
const success = require('../../success');

module.exports = {
  root: {
    path: '',
    router: read
  },
  discard: {
    path: '/discard',
    router: discard
  },
  extend: {
    path: '/extend',
    router: extend
  },
  deadlinePassed: {
    path: '/deadline-passed',
    router: deadlinePassed
  },
  raAwerb: {
    path: '/ra-awerb',
    breadcrumb: false,
    router: raAwerb
  },
  confirm: {
    path: '/confirm',
    router: confirm
  },
  endorse: {
    path: '/endorse',
    breadcrumb: false,
    router: endorse
  },
  success: {
    path: '/success',
    router: success
  }
};
