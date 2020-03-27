const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Remove role',
  applyingFor: 'You are removing:',
  onBehalfOf: 'From:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why are you removing this role?',
  buttons: {
    submit: 'Submit'
  }
});
