module.exports = {
  firstName: {
    inputType: 'inputText',
    validate: ['required']
  },
  lastName: {
    inputType: 'inputText',
    validate: ['required']
  },
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: (email) => /^\S+@\S+$/.test(email)
      }
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: ['required', { dateIsBefore: 'now' }]
  },
  organisation: {
    inputType: 'inputText',
    validate: ['required']
  },
  qualificationLevelAndSubject: {
    inputType: 'inputText',
    validate: ['required']
  },
  applicantLearningUse: {
    inputType: 'textAreaWithWordCount',
    maxWordCount: 250,
    validate: ['lessThanOrEqualToMaxWordCount', 'required']
  },
  jobTitleOrQualification: {
    inputType: 'inputText',
    validate: ['required']
  },
  fieldOfExpertise: {
    inputType: 'inputText',
    validate: ['required']
  },
  applicantTrainingUseAtWork: {
    inputType: 'textAreaWithWordCount',
    maxWordCount: 100,
    validate: ['lessThanOrEqualToMaxWordCount', 'required']
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
