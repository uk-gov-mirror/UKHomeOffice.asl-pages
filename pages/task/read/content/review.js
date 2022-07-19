const { merge } = require('lodash');
const baseContent = require('./base');
const refusalNotice = require('./refusal-notice');

module.exports = merge({}, baseContent, {
  refusalNotice,
  page: {
    heading: 'Check notice of intention to refuse',
    summary: 'This notice will be sent to the applicant and a copy forwarded to the establishment licence holder and admins.'
  },
  buttons: {
    submit: 'Send now'
  }
});
