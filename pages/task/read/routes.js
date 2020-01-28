const { extend, confirm, success, read, discard } = require('./routers');

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
  confirm: {
    path: '/confirm',
    router: confirm
  },
  success: {
    path: '/success',
    router: success
  }
};
