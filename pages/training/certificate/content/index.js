module.exports = {
  title: 'What are the certificate details?',
  hint: 'You do not need to send certificates or copies to ASRU.',
  fields: {
    certificateNumber: {
      label: 'Certificate number'
    },
    accreditingBody: {
      label: 'Accrediting body or course provider'
    },
    passDate: {
      label: 'Date awarded',
      hint: `This should be within the last 5 years

For example, 30 09 2020`
    }
  },
  errors: {
    certificateNumber: {
      required: 'You need to enter a certificate number'
    },
    accreditingBody: {
      required: 'You need to choose an accrediting body or course provider'
    },
    passDate: {
      required: 'You need to enter the date when the certificate was awarded.',
      validDate: 'Date awarded must be a valid date',
      dateIsBefore: 'Date awarded must be in the past.'
    },
    otherAccreditingBody: {
      required: 'Please specify which accrediting body'
    }
  },
  buttons: {
    submit: 'Continue'
  }
};
