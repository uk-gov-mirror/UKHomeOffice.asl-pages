module.exports = {
  task: {
    confirm: {
      title: 'Confirm decision',
      decision: {
        title: 'Your decision',
        label: 'Endorsement',
        change: 'Change'
      },
      declaration: {
        title: 'Declaration'
      },
      link: {
        exit: 'Exit'
      }
    },
    'ntco-endorsed': {
      decision: 'Endorsed',
      declaration:
        `By endorsing this application, I agree that:
           * I have the authority of the establishment licence holder, and they are aware that this establishment will
           have financial responsibility for this personal licence if granted.`
    },
    'returned-to-applicant': {
      decision: 'Returned to applicant'
    }
  }
};
