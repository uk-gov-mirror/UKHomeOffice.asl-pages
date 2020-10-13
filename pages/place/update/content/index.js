const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  buttons: {
    submit: 'Continue'
  }
});
