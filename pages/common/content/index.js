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
      base: 'Personal licence'
    },
    place: {
      list: 'Licensed premises'
    },
    profile: {
      list: 'People',
      view: '{{model.firstName}} {{model.lastName}}',
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
      read: '{{project.title}}'
    },
    account: {
      menu: 'Account',
      edit: 'Edit'
    },
    feedback: 'Feedback',
    task: {
      base: 'Tasklist',
      read: 'View task',
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
      list: 'Licensed premises',
      edit: 'Change licensed premises',
      confirm: 'Confirm changes'
    },
    pil: {
      categories: 'Choose personal licence (PIL) category',
      dashboard: 'Apply for categories A, B, C, D and F PIL',
      categoryAToF: 'Categories A,B,C,D and F',
      categoryE: 'Category E'
    }
  },
  licenceNumber: 'Licence number',
  establishmentLicenceNumber: 'Establishment licence number',
  personalLicenceNumber: 'Personal licence number',
  licenceHolder: 'Licence holder',
  pelh: 'Establishment licence holder',
  nprc: 'Named person responsible for compliance',
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
  }
};
