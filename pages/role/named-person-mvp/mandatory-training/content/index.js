
module.exports = {
  title: 'mandatory training',
  nacwoMandatoryTrainingDesc: 'Nominees must have completed all the mandatory training in the last 5 years before starting the role, unless:',
  trianingUnless1: 'there is an unavoidable delay, in which case they must complete any missing modules as soon as possible',
  trianingUnless2: 'they have grounds for an exemption - which means they have equivalent training or professional experience which makes the training unnecessary',
  nacwoMandatoryTrainingRequirements: 'NACWO mandatory training requirements (opens below)',
  checkTrainingRecord: `Check {{profile.firstName}} training record (opens below)`,
  supportingGuidanceTitle: 'Supporting guidance on GOV.UK',
  fields: {
    mandatory: {
      label: `Has {{profile.firstName}} completed all the mandatory training?`
    }
  },
  buttons: {
    submit: 'Save and continue',
    cancel: 'Cancel'
  },
  errors: {
    type: {
      required: `Tell us if {{profile.firstName}}'s training record is accurate and up to date`
    }
  }
};
