const { merge } = require('lodash');
const baseContent = require('../../../content');

module.exports = merge({}, baseContent, {
  panel: {
    title: 'Application submitted to ASRU',
    summary: 'A confirmation email has been sent to'
  },
  whatNext: {
    title: 'What happens next?',
    summary: 'ARSU will review your application and may ask for more information before approving or rejecting it.'
  },
  link: {
    dashboard: 'Back to dashboard'
  }
});
