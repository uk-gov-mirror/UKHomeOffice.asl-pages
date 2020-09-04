const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  pages: {
    place: {
      edit: 'Create approved area'
    }
  },
  fields: {
    comments: {
      label: 'Why are you creating this approved area?'
    }
  },
  inset: 'Any addition to your licensed premises will need to be assessed.',
  buttons: {
    submit: 'Continue'
  }
});
