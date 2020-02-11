const { merge } = require('lodash');
const content = require('../../content');

module.exports = merge({}, content, {
  intro: 'These details can be used for any contact regarding billing or finances.',
  inset: 'All fields are optional.'
});
