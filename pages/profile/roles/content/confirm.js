const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge(baseContent, {
  reviewRoleApplication: 'Please review your application for a named role',
  applyingFor: 'You are applying for the role:',
  onBehalfOf: 'On behalf of:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Explain why this person is suitable for the role:',
  declaration: 'Please confirm that you understand',
  buttons: {
    submit: 'Submit to ASRU'
  },
  errors: {
    declaration: {
      required: 'Please confirm that you understand'
    }
  }
});
