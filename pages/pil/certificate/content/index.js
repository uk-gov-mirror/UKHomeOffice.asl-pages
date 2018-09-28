module.exports = {
  fields: {
    certificate_number: {
      label: 'Certificate number'
    },
    accrediting_body: {
      label: 'Accreditation body'
    },
    pass_date: {
      label: 'Date awarded'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    certificate_number: {
      required: 'You need to enter a certificate number'
    },
    accrediting_body: {
      required: 'You need to chose an accreditation body.'
    },
    pass_date: {
      required: 'You need to enter the date when the certificate was awarded.',
      dateIsBefore: 'Date awarded must be in the past'
    }
  },
  pil: {
    certificate: {
      title: 'Enter training details'
    }
  }
};
