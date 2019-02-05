const base = require('./base');
const pil = require('./pil');
const place = require('./place');
const profile = require('./profile');
const { merge } = require('lodash');

module.exports = (task) => {
  switch (task.data.model) {
    case 'pil':
      return merge({}, base, pil);
    case 'place':
      return merge({}, base, place);
    case 'profile':
      return merge({}, base, profile);
    default:
      return base;
  }
};
