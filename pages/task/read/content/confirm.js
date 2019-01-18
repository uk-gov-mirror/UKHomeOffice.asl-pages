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
    'resubmitted': {
      decision: 'Resubmitted'
    },
    'withdrawn-by-applicant': {
      decision: 'Withdrawn'
    },
    'referred-to-inspector': {
      decision: 'Referred to inspector'
    },
    'inspector-recommended': {
      decision: 'Recommended'
    },
    'inspector-rejected': {
      decision: 'Recommended for rejection'
    },
    'resolved': {
      decision: 'Licence updated'
    },
    'rejected': {
      decision: 'Rejected'
    },
    'returned-to-applicant': {
      decision: 'Returned to applicant'
    }
  }
};
