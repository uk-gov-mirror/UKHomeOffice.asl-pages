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
  'rop-submitted': {
    whatNext: {
      body: `Your return has been submitted.`,
      external: ''
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the record of this submission.'
    }
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
  'review-complete': {
    panel: {
      title: 'Complete'
    },
    whatNext: {
      body: `This PIL review is complete.`,
      external: 'The licence holder has been emailed.'
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
  'intention-to-refuse': {
    panel: {
      title: 'Sent'
    },
    whatNext: {
      body: `The application has been returned and the notice of intention to refuse has been sent to the applicant and establishment.`
    }
  },
  'resolved': {
    panel: {
      title: 'Approved'
    },
    whatNext: {
      body: `This request has been approved.`,
      internal: 'The relevant people have been emailed.',
      external: ''
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  },
  'rejected': {
    panel: {
      title: 'Rejected'
    },
    whatNext: {
      body: `This request has been rejected.`,
      internal: 'The relevant people have been emailed.'
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  },
  'revoked': {
    panel: {
      title: 'Revoked'
    },
    whatNext: {
      body: `This licence has been revoked.`,
      internal: 'The relevant people have been emailed.'
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  },
  'refused': {
    panel: {
      title: 'Refused'
    },
    whatNext: {
      body: `This application for a licence has been refused. The applicant and establishment admins have been notified.`
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  }
};
