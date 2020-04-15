const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Grant access',
  fields: {
    profile: {
      label: 'Who needs to be able to view this project?',
      hint: 'If the person you’re looking for doesn’t appear in the list, ask a [HOLC at your establishment]({{profilesHolcFiltered}}) to give them access on your behalf.'
    }
  },
  notifications: {
    success: 'Access granted. {{name}} has been notified.'
  },
  errors: {
    profile: {
      required: 'Select a user.'
    }
  }
});
