const { extend, confirm, read, discard, deadlinePassed, endorse, removeDeadline, reinstateDeadline, review } = require('./routers');
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
  removeDeadline: {
    path: '/remove-deadline',
    router: removeDeadline
  },
  reinstateDeadline: {
    path: '/reinstate-deadline',
    router: reinstateDeadline
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
  review: {
    path: '/review',
    router: review
  },
  success: {
    path: '/success',
    router: success
  }
};
