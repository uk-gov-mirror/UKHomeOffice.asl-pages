module.exports = {
  title: 'Apply for category E licence',
  fields: {
    firstName: {
      label: 'First name'
    },
    lastName: {
      label: 'Last name'
    },
    email: {
      label: 'Email address'
    },
    dob: {
      label: 'Date of birth',
      hint: 'For example, 12 11 1980'
    },
    trainingNeed: {
      label: 'Training need',
      hint: 'Include details about the participant\'s organisation, job title, specialism and grade (for example, trainee doctor or registrar). Explain how their career will benefit from training.'
    }
  },
  errors: {
    firstName: {
      required: 'Enter the first name of the participant.'
    },
    lastName: {
      required: 'Enter the last name of the participant.'
    },
    email: {
      required: 'Enter the email address of the participant.',
      customValidate: 'Enter a valid email address.'
    },
    dob: {
      required: 'Enter the date of birth of the participant.',
      dateIsBefore: 'Date of birth must be in the past.'
    },
    trainingNeed: {
      required: 'This is a required field.'
    }
  },
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
};
