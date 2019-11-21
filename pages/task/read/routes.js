const { extend, confirm, success, read } = require('./routers');

module.exports = {
  root: {
    path: '',
    router: read
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
