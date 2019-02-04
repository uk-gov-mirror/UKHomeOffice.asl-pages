const { merge } = require('lodash');
const baseContent = require('./base');

module.exports = merge({}, baseContent, {
  title: 'Confirm decision',
  fields: {
    status: {
      label: 'Your decision'
    },
    endorsement: {
      label: 'Endorsement'
    },
    restrictions: {
      label: 'Restrictions'
    }
  },
  actions: {
    change: 'Change'
  },
  declaration: {
    title: 'Declaration',
    'ntco-endorsed':
      `By endorsing this application, I agree that:
         * I have the authority of the establishment licence holder, and they are aware that this establishment will
         have financial responsibility for this personal licence if granted.`
  }
});
