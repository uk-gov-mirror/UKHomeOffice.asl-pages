const read = require('./read');

module.exports = {
  read: {
    path: '/*',
    router: read
  }
};
