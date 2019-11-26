const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Enter training details',
  buttons: {
    submit: 'Continue'
  },
  errors: {
    certificateNumber: {
      required: 'You need to enter a certificate number'
    },
    accreditingBody: {
      required: 'You need to choose an accreditation body.'
    },
    otherAccreditingBody: {
      required: 'Please specify which accrediting body'
    },
    passDate: {
      required: 'You need to enter the date when the certificate was awarded.',
      validDate: 'Date awarded must be a valid date.',
      dateIsBefore: 'Date awarded must be in the past.'
    }
  }
});
