const base = require('./base');
const pil = require('./pil');
const { merge } = require('lodash');

module.exports = (task) => {

  switch (task.data.model) {
    case 'pil':
      return merge({}, base, pil);
    default:
      return base;
  }
};
