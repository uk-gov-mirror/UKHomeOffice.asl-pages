const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  fields: {
    email: {
      label: 'Email'
    },
    createdAt: {
      label: 'Invitation sent'
    },
    role: {
      label: 'Permission level'
    }
  },
  diff: {
    singular: 'Less than 1 day left',
    plural: 'Less than {{diff}} days left',
    standard: '{{diff}} days left'
  }
});
