const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  inset: 'Any changes to suitability or holding codes will need to be assessed.',
  buttons: {
    submit: 'Continue'
  }
});
