const base = require('./base');
const pil = require('./pil');
const place = require('./place');
const profile = require('./profile');
const role = require('./role');
const { merge } = require('lodash');

const getContent = model => {
  switch (model) {
    case 'pil':
      return pil;
    case 'place':
      return place;
    case 'profile':
      return profile;
    case 'role':
      return role;
  }
  return {};
};

module.exports = task => merge({}, base, getContent(task.data.model));
