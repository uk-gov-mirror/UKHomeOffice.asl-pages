module.exports = {
  fields: {
    certificate_number: {
      label: 'Certificate Number'
    },
    accrediting_body: {
      label: 'Accreditation Body'
    },
    dateAwarded: {
      label: 'Date Awarded'
    }
  },
  errors: {
    certificate_number: {
      required: 'You need to enter a certificate number'
    },
    accrediting_body: {
      required: 'You need to chose an accreditation body.'
    },
    dateAwarded: {
      required: 'You need to enter the date when the certificate was awarded.'
    }
  },
  pil: {
    certificate: {
      title: 'Enter training details'
    }
  }
};
