module.exports = {
  siteTitle: 'Research and testing using animals',
  beta: 'This is a new service - your [feedback](mailto:ASPELQueries@homeoffice.gov.uk) will help us to improve it.',
  breadcrumbs: {
    dashboard: 'Home',
    invitation: 'Accept invitation',
    establishment: {
      list: 'Establishments',
      dashboard: '{{establishment.name}}',
      read: 'Details',
      update: 'Amend establishment details',
      apply: 'Apply for licence',
      fees: 'Projected licence fees'
    },
    pil: {
      read: 'View personal licence',
      create: 'Apply for personal licence',
      update: {
        root: 'Amend personal licence',
        training: 'Training',
        exemptions: 'Exemptions',
        procedures: 'Procedures',
        species: 'Animal types',
        establishment: 'Establishment'
      },
      revoke: 'Revoke personal licence'
    },
    place: {
      list: 'Approved areas',
      create: 'Create approved area',
      update: 'Amend approved area',
      delete: 'Remove approved area'
    },
    profile: {
      list: 'People',
      read: '{{profile.firstName}} {{profile.lastName}}',
      invite: 'Invite user',
      invitations: 'Invitations',
      permission: 'Change / remove permissions'
    },
    role: {
      create: 'Assign named role',
      delete: 'Remove named role',
      confirm: 'Confirm',
      success: 'Success'
    },
    project: {
      list: 'Projects',
      read: '{{project.title}}',
      updateLicenceHolder: 'Update licence holder',
      upload: 'Upload draft application',
      revoke: 'Revoke licence',
      import: 'Import project'
    },
    projectVersion: {
      read: 'View',
      update: 'Amend licence',
      'update-draft': 'Edit draft'
    },
    account: {
      menu: 'Your account',
      update: 'Edit your details',
      updateEmail: 'Change your email address'
    },
    feedback: 'Feedback',
    task: {
      list: 'Tasklist',
      read: {
        root: 'View task',
        extend: 'Extend deadline',
        confirm: 'Confirm',
        success: 'Success'
      }
    }
  },
  pages: {
    account: {
      title: 'Your account',
      update: 'Edit your details',
      updateEmail: {
        base: 'Change your email address',
        confirm: 'Confirm changes'
      }
    },
    dashboard: {
      greeting: 'Hello {{name}}',
      invite: 'Invite',
      tasks: 'Tasks'
    },
    establishment: {
      list: 'Establishments',
      read: 'Establishment details',
      edit: 'Amend establishment details',
      confirm: 'Confirm changes',
      fees: {
        overview: 'Licence fees'
      }
    },
    profile: {
      list: 'People',
      invite: 'Invite user',
      invitations: 'Invitations',
      permission: {
        change: 'Change / remove'
      },
      links: {
        back: 'Back to profile'
      }
    },
    project: {
      list: 'Projects',
      read: 'Project'
    },
    place: {
      list: 'Approved areas',
      edit: 'Amend approved area',
      confirm: 'Confirm changes'
    },
    pil: {
      categories: 'Choose personal licence (PIL) category',
      dashboard: 'Apply for categories A, B, C, D and F PIL',
      categoryAToF: 'Categories A,B,C,D and F',
      categoryE: 'Category E'
    },
    edit: 'Edit'
  },
  licenceNumber: 'Licence number',
  establishmentLicenceNumber: 'Establishment licence number',
  personalLicenceNumber: 'Personal licence number',
  licenceHolder: 'Licence holder',
  pelh: 'Establishment licence holder',
  nprc: 'Named Person Responsible for Compliance',
  holc: 'Home Office Liaison Contact (HOLC)',
  inspectors: 'Inspectors',
  spoc: 'Single Point of Contact (SPoC)',
  establishment: 'Establishment',
  buttons: {
    submit: 'Submit',
    edit: 'Edit',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  fields: {
    declaration: {
      label: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
    }
  },
  errors: {
    heading: 'Please fix the following error',
    headingPlural: 'Please fix the following errors',
    form: {
      unchanged: 'No changes have been made',
      csrf: 'This form data has been changed somewhere else.'
    },
    declaration: {
      required: 'Please confirm that you understand.'
    }
  },
  countdown: {
    singular: '1 {{unit}} left',
    plural: '{{diff}} {{unit}}s left',
    expired: 'Expired',
    expiresToday: 'Expires today'
  },
  success: {
    whatNext: {
      title: 'What happens next?'
    }
  },
  notifications: {
    success: 'Changes saved.'
  },
  warnings: {
    openTask: 'This item is currently being edited'
  },
  invalidLicence: {
    status: {
      inactive: 'Draft',
      pending: 'Draft',
      revoked: 'Revoked',
      expired: 'Expired',
      active: 'Amendment in progress'
    },
    summary: {
      pel: `This licence is not active. The establishment is not authorised to apply regulated procedures to protected animals, or to breed, supply, or keep protected animals in any approved area.`,
      pil: `This licence is not active. The licence holder or applicant is not authorised to carry out regulated procedures in the categories stated in this licence/application.`,
      ppl: `This licence is not active. The licence holder or applicant is not authorised to carry out the programme of work as stated in this licence/application.`,
      ppl_active: `This amendment has not been approved yet.`
    },
    view: 'View granted licence'
  },
  updateInProgress: 'There is a pending change request to these conditions.',
  'view-task': 'View task',
  openTask: {
    application: {
      title: 'Application in progress',
      description: 'An application has been submitted and is being reviewed. You can view or recall the application.'
    },
    amendment: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence has been submitted and is being reviewed. You can view or recall the amendment.'
    },
    revocation: {
      title: 'Revocation in progress',
      description: 'A request to revoke this licence has been submitted and is being reviewed. You can view or recall the revocation.'
    },
    transfer: {
      title: 'Transfer in progress',
      description: 'A request to transfer this licence to another establishment has been submitted and is being reviewed. You can view or recall the licence transfer.'
    }
  }
};
