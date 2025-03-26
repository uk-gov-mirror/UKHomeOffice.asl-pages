const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Add role',
  applyingFor: 'You are assigning:',
  onBehalfOf: 'To:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why is this person suitable for this role?',
  buttons: {
    submit: 'Submit'
  }
});
