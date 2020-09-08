const { extend, confirm, read, discard, deadlinePassed } = require('./routers');
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
  confirm: {
    path: '/confirm',
    router: confirm
  },
  success: {
    path: '/success',
    router: success
  }
};
