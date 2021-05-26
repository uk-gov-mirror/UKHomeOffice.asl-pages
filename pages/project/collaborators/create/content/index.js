const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Grant access',
  fields: {
    profile: {
      label: 'Who needs to be able to view this project?',
      hint: 'If the person you’re looking for doesn’t appear in the list, ask a [HOLC at your establishment]({{profilesHolcFiltered}}) to give them access on your behalf.'
    },
    role: {
      label: 'What access should they have?',
      options: {
        basic: {
          label: 'Read-only',
          hint: 'View this project\'s licence and documents'
        },
        edit: {
          label: 'Edit',
          hint: 'Work on licence amendments and returns of procedures (no submission)'
        }
      }
    }
  },
  notifications: {
    success: 'Access granted. {{name}} has been notified.'
  },
  errors: {
    profile: {
      required: 'Select a user.'
    },
    role: {
      required: 'Specify an access level'
    }
  }
});
