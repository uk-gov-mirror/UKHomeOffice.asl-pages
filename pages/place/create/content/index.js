const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  pages: {
    place: {
      edit: 'Add new premises'
    }
  },
  fields: {
    comments: {
      label: 'Why are you making this addition?'
    }
  },
  inset: 'Any addition to your licensed premises will need to be assessed'
});
