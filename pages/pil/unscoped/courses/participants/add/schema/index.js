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
    inputType: 'textAreaWithWordCount',
    maxWordCount: 250,
    validate: ['lessThanOrEqualToMaxWordCount']
  },
  jobTitleOrQualification: {
    inputType: 'inputText'
  },
  fieldOfExpertise: {
    inputType: 'inputText'
  },
  applicantTrainingUseAtWork: {
    inputType: 'textAreaWithWordCount',
    maxWordCount: 100,
    validate: ['lessThanOrEqualToMaxWordCount']
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
