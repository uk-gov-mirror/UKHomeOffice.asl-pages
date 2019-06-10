const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  pages: {
    place: {
      edit: 'Add new approved area'
    }
  },
  fields: {
    comments: {
      label: 'Why are you adding this approved area?'
    }
  },
  inset: 'Any addition to your licensed premises will need to be assessed'
});
