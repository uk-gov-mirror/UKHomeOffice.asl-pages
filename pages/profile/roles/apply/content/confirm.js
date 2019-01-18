const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Please review your application for a named role',
  applyingFor: 'You are applying for the role:',
  onBehalfOf: 'On behalf of:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Explain why this person is suitable for the role:',
  declarations: {
    title: 'Please confirm that you understand',
    declaration1: `Applicant authority, conflict of interests and PELh authority declaration text to go here`
  },
  buttons: {
    submit: 'Submit to ASRU'
  },
  errors: {
    declarations: {
      customValidate: 'Please confirm that you understand'
    }
  }
});
