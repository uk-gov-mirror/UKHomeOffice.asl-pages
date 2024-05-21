module.exports = {
  default: {
    panel: {
      title: 'Submitted'
    },
    whatNext: {
      body: ``,
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
      body: ``,
      internal: 'The relevant people have been emailed.',
      external: ''
    },
    taskLink: {
      before: '',
      linkText: 'View history of application'
    }
  },
  'rejected': {
    panel: {
      title: 'Refused'
    },
    whatNext: {
      body: 'The relevant people have been emailed.'
    },
    taskLink: {
      before: '',
      linkText: 'View history of application'
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
      before: '',
      linkText: 'View history of application'
    }
  },
  'refused': {
    panel: {
      title: 'Refused'
    },
    whatNext: {
      body: `The applicant and establishment admins have been emailed.`
    },
    taskLink: {
      before: '',
      linkText: 'View history of application'
    }
  },
  'suspended': {
    panel: {
      title: 'Suspended'
    },
    whatNext: {
      body: {
        pil: `This licence has been suspended. The licence holder is not authorised to carry out the regulated procedures
in the categories stated in this licence.

The relevant people have been emailed.`,

        project: `This licence has been suspended. The licence holder is not authorised to carry out the programme of
work as stated in this licence.

The relevant people have been emailed.`,

        establishment: `This licence has been suspended. The establishment is no longer authorised to apply regulated
procedures to protected animals, or to breed, supply, or keep protected animals in any area at the establishment.

The relevant people have been emailed.`
      }
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  },
  'reinstated': {
    panel: {
      title: 'Reinstated'
    },
    whatNext: {
      body: {
        pil: `This licence has been reinstated. The licence holder is now authorised to carry out the regulated procedures
in the categories stated in this licence.

The relevant people have been emailed.`,

        project: `This licence has been reinstated. Regulated procedures are now authorised to be carried out under
this licence.

The relevant people have been emailed.`,

        establishment: `This licence has been reinstated. The establishment is now authorised to apply regulated procedures
to protected animals, or to breed, supply, or keep protected animals in any area at the establishment.

The relevant people have been emailed.`
      }
    },
    taskLink: {
      before: 'You can ',
      linkText: 'view the history of this request.'
    }
  },
  'licence-amended': {
    panel: {
      title: 'Licence amended'
    },
    whatNext: {
      body: '',
      internal: 'The relevant people have been emailed.',
      external: ''
    },
    taskLink: {
      before: '',
      linkText: 'View history of application'
    }
  },
  'pil-transfer': {
    panel: {
      title: 'Transfer approved'
    },
    whatNext: {
      body: '',
      internal: 'The relevant people have been emailed.',
      external: ''
    },
    taskLink: {
      before: '',
      linkText: 'View history of application'
    }
  }
};
