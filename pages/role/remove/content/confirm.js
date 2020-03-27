const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Remove role',
  applyingFor: 'You are removing:',
  onBehalfOf: 'From:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why are you removing this role?',
  nacwoWarning: 'This NACWO will also automatically be removed from any areas assigned to them in the schedule of premises.',
  buttons: {
    submit: 'Submit'
  }
});
