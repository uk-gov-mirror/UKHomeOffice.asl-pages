module.exports = {
  default: {
    panel: {
      title: 'Submitted'
    },
    whatNext: {
      body: `Your request has been submitted.`,
      external: 'You’ll be emailed if any further information is required or when a decision has been made.'
    },
    taskLink: {
      before: 'You can ',
      linkText: 'track the progress of this request.'
    }
  },
  'submitted': {
    // add any content that differs from default
  },
  'recalled-by-applicant': {
    panel: {
      title: 'Recalled'
    },
    whatNext: {
      body: `This request has been withdrawn.`,
      external: ''
    },
    taskLink: {
      before: 'It can be ',
      linkText: 'edited or discarded.'
    }
  },
  'discarded': {
    panel: {
      title: 'Discarded'
    },
    whatNext: {
      body: `This request has been discarded.`,
      external: ''
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the discarded request.'
    }
  },
  'returned-to-applicant': {
    panel: {
      title: 'Returned'
    },
    whatNext: {
      body: `This request has been returned.`
    }
  },
  'endorsed': {
    panel: {
      title: 'Endorsed'
    },
    whatNext: {
      body: `This request has been endorsed.`
    }
  },
  'complete': {
    panel: {
      title: 'Complete'
    },
    whatNext: {
      body: `This PIL review is complete.`,
      internal: 'The licence holder has been emailed.'
    }
  },
  'inspector-recommendation': {
    panel: {
      title: 'Recommendation made'
    },
    whatNext: {
      body: `Your recommendation has been made.`
    }
  },
  'referred-to-inspector': {
    panel: {
      title: 'Referred'
    },
    whatNext: {
      body: `This request has been referred to an inspector.`
    }
  },
  'resolved': {
    panel: {
      title: 'Approved'
    },
    whatNext: {
      body: `This request has been approved.`,
      internal: 'The relevant people have been emailed.'
    }
  },
  'rejected': {
    panel: {
      title: 'Rejected'
    },
    whatNext: {
      body: `This request has been rejected.`,
      internal: 'The relevant people have been emailed.'
    }
  },
  'revoked': {
    panel: {
      title: 'Revoked'
    },
    whatNext: {
      body: `This licence has been revoked.`,
      internal: 'The relevant people have been emailed.'
    }
  }
};
