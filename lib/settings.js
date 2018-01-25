const clone = require('lodash.clonedeep');

module.exports = settings => {
  settings = clone(settings);
  return Object.assign({
    logformat: 'dev',
    root: process.cwd()
  }, settings);
};
