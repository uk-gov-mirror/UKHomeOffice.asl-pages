const base = require('./base');
const pil = require('./pil');
const place = require('./place');
const profile = require('./profile');
const role = require('./role');
const project = require('./project');
const establishment = require('./establishment');
const trainingPil = require('./training-pil');
const rop = require('./rop');
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
    case 'project':
      return project;
    case 'establishment':
      return establishment;
    case 'trainingPil':
      return trainingPil;
    case 'rop':
      return rop;
  }
  return {};
};

module.exports = task => merge({}, base, getContent(task.data.model));
