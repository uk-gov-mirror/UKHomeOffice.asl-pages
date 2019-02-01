const base = require('./base');
const pil = require('./pil');
const place = require('./place');
const { merge } = require('lodash');

module.exports = (task) => {
  switch (task.data.model) {
    case 'pil':
      return merge({}, base, pil);
    case 'place':
      return merge({}, base, place);
    default:
      return base;
  }
};
