const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Transfer personal licence',
  description: `With a personal licence you can work at multiple establishments.

  When a licence is transferred, the new establishment takes on the financial and training responsibilities for that licence.`,

  details: {
    summary: `Why is the establishment I'm looking for not listed?`,
    expand: `To transfer your licence to a different establishment, ask them to send you an invitation. Once you accept the invitation, you can request your licence to be transferred.`
  },

  fields: {
    establishment: {
      label: 'Proposed establishment'
    }
  },

  errors: {
    establishment: {
      definedValues: 'Please select an establishment from the list provided'
    }
  },

  buttons: {
    submit: 'Continue'
  }
});
