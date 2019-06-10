const { merge } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');

module.exports = merge({}, baseContent, {
  tasks,
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
  declaration: {
    title: 'Declaration',
    'ntco-endorsed':
      `By endorsing this {{type}}, I agree that:
         * I have the authority of the establishment licence holder, and they are aware that this establishment will
         have financial responsibility for this personal licence if granted.`
  }
});
