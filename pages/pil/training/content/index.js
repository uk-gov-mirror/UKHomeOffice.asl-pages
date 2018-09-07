module.exports = {
  fields: {
    certificateNumber: {
      label: 'Certificate Number'
    },
    accreditationBody: {
      label: 'Accreditation Body'
    },
    dateAwarded: {
      label: 'Date Awarded'
    }
  },
  errors: {
    certificateNumber: {
      required: 'You need to enter a certificate number'
    },
    accreditationBody: {
      required: 'You need to chose an accreditation body.'
    },
    dateAwarded: {
      required: 'You need to enter the date when the certificate was awarded.'
    }
  },
  pil: {
    training: {
      title: 'Enter training details'
    }
  }
};
