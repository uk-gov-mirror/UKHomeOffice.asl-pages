const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Assign named role',
  applyingFor: 'You are assigning the role of:',
  onBehalfOf: 'To:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why is this person suitable for this named role?',
  declarations: {
    title: 'Please confirm',
    declaration1: `You have the authority of the PEL holder/NPRC to make this amendment, and that you have received, read, and hold a copy of the Home Office guidance on the operation of the Animals (Scientific Procedures) Act 1986.`
  },
  buttons: {
    submit: 'Submit'
  },
  errors: {
    declarations: {
      customValidate: 'Confirm the declaration.'
    }
  }
});
