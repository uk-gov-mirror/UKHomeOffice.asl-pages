module.exports = {
  firstName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  lastName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: email => /^\S+@\S+$/.test(email)
      }
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      { dateIsBefore: 'now' }
    ]
  },
  organisation: {
    inputType: 'inputText'
  },
  qualificationLevelAndSubject: {
    inputType: 'inputText'
  },
  applicantLearningUse: {
    inputType: 'textarea'
  },
  jobTitleOrQualification: {
    inputType: 'inputText'
  },
  fieldOfExpertise: {
    inputType: 'inputText'
  },
  applicantTrainingUseAtWork: {
    inputType: 'textarea'
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
