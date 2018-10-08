module.exports = {
  fields: {
    certificateNumber: {
      label: 'Certificate number'
    },
    accreditingBody: {
      label: 'Accreditation body'
    },
    passDate: {
      label: 'Date awarded'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    certificateNumber: {
      required: 'You need to enter a certificate number'
    },
    accreditingBody: {
      required: 'You need to chose an accreditation body.'
    },
    passDate: {
      required: 'You need to enter the date when the certificate was awarded.',
      validDate: 'Date awarded must be a valid date',
      dateIsBefore: 'Date awarded must be in the past'
    }
  },
  pil: {
    certificate: {
      title: 'Enter training details'
    }
  }
};
