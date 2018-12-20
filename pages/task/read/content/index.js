const base = require('./base');
const { merge } = require('lodash');

module.exports = (task) => {

  switch (task.data.model) {
    case 'pil':
      return merge({}, base, require('./pil'));
    default:
      return base;
  }
};
