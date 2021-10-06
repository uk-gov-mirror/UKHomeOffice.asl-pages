const { merge } = require('lodash');
const content = require('./');

module.exports = merge({}, content, {
  title: 'Please review your answers for changing a PPL holder',
  fields: {
    declaration: {
      label: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
    }
  },
  buttons: {
    submit: '{{#isDraft}}Submit{{/isDraft}}{{^isDraft}}Continue{{/isDraft}}'
  }
});
