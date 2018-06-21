const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  pages: {
    place: {
      edit: 'Add new premises'
    }
  },
  inset: 'Any addition to your licensed premises will need to be assesed'
});
