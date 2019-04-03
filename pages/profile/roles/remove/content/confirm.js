const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Amend profile',
  applyingFor: 'You are removing:',
  onBehalfOf: 'From the user:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why are you removing this named role from this person?',
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
