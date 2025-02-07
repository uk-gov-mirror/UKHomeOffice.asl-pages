module.exports = {
  title: 'Before you nominate someone for a role',
  supportingGuidanceTitle: 'Supporting guidance on GOV.UK',
  subtitle: 'Before you nominate someone for a role you must ensure:',
  beforeYouNominateIntro: `\
### Before you nominate someone for a role you must ensure:

* they have agreed to be nominated
* they meet all the mandatory training requirements, or they have grounds for exemption
* __the Named Training and Competency Officer (NTCO) has endorsed their training and exemptions:__
    * the nominee has discussed their training and exemptions with the NTCO
    * the NTCO has checked their mandatory training certificates
    * the NTCO has checked any certificates showing equivalent training to support exemption requests, and emailed them to ASRU Licensing
* you have added them as an ASPeL user
* they have updated their training and exemptions in their [training record in ASPeL]({{trainingDashboardUrl}})
* __the PEL holder supports the nomination and is confident that the nominee:__
    * has the recommended skills and experience
    * has no significant conflict of interest, and their declaration form is held on record at the establishment`,
  fields: {
    type: {
      label: `Is {{profile.firstName}}'s training record accurate and up to date?`
    }
  },
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
};
