module.exports = {
  siteTitle: 'Research and testing using animals',
  beta: 'This is a new service - your [feedback](mailto:animalscience@digital.homeoffice.gov.uk) will help us to improve it.',
  breadcrumbs: {
    dashboard: 'Home',
    invitation: 'Accept invitation',
    establishment: {
      list: 'Establishments',
      dashboard: '{{establishment.name}}',
      read: 'Details'
    },
    pil: {
      read: 'View personal licence',
      create: 'Apply for personal licence',
      training: 'Training',
      exemptions: 'Exemptions',
      procedures: 'Procedures',
      success: 'Success'
    },
    place: {
      list: 'Approved areas',
      create: 'Create approved area',
      update: 'Amend approved area',
      delete: 'Remove approved area'
    },
    profile: {
      list: 'People',
      view: '{{profile.firstName}} {{profile.lastName}}',
      invite: 'Invite user',
      role: {
        apply: {
          base: 'Apply for named role',
          confirm: 'Confirm',
          success: 'Success'
        },
        remove: {
          base: 'Remove named role',
          confirm: 'Confirm',
          success: 'Success'
        }
      },
      permission: 'Change / remove permissions'
    },
    project: {
      list: 'Projects',
      read: '{{project.title}}',
      update: 'Edit draft',
      amend: 'Amend licence'
    },
    account: {
      menu: 'Your account',
      edit: 'Edit'
    },
    feedback: 'Feedback',
    task: {
      base: 'Tasklist',
      read: 'View task',
      extend: 'Extend deadline',
      confirm: 'Confirm',
      success: 'Success'
    }
  },
  pages: {
    account: {
      title: 'Your account'
    },
    dashboard: {
      greeting: 'Hello {{name}}',
      invite: 'Invite',
      tasks: 'Tasks'
    },
    establishment: {
      list: 'Establishments',
      read: 'Establishment details'
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
  nprc: 'Named person responsible for compliance',
  inspectors: 'Inspectors',
  spoc: 'Single Point of Contact (SPoC)',
  establishment: 'Establishment',
  buttons: {
    submit: 'Submit',
    edit: 'Edit',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  errors: {
    heading: 'Please fix the following error',
    headingPlural: 'Please fix the following errors',
    form: {
      unchanged: 'No changes have been made',
      csrf: 'This form data has been changed somewhere else.'
    }
  },
  diff: {
    singular: 'Less than 1 month left',
    plural: 'Less than {{diff}} months left',
    standard: '{{diff}} months left',
    expired: 'Expired'
  },
  success: {
    whatNext: {
      title: 'What happens next?'
    }
  },
  notifications: {
    success: 'Changes saved!'
  },
  invalidLicence: {
    status: {
      inactive: 'Draft',
      pending: 'Draft',
      revoked: 'Revoked',
      expired: 'Expired'
    },
    summary: {
      pel: `This licence is not active. The establishment is not authorised to apply regulated procedures to protected
        animals, or to breed, supply, or keep protected animals in any approved area.`,
      pil: `This licence is not active. The licence holder or applicant is not authorised to carry out regulated
        procedures in the categories stated in this licence/application.`,
      ppl: `This licence is not active. The licence holder or applicant is not authorised to carry out the programme of
        work as stated in this licence/application.`
    }
  }
};
