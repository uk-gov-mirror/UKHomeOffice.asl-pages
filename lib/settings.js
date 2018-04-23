const { cloneDeep, merge } = require('lodash');

module.exports = settings => {
  settings = cloneDeep(settings);
  return merge({
    log: {
      level: 'info',
      format: 'dev'
    },
    root: process.cwd()
  }, settings);
};
