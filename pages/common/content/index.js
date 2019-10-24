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
      update: 'Amend establishment details'
    },
    pil: {
      read: 'View personal licence',
      create: 'Apply for personal licence',
      update: 'Amend personal licence',
      revoke: 'Revoke personal licence',
      training: 'Training',
      exemptions: 'Exemptions',
      procedures: 'Procedures'
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
      update: 'Edit draft',
      amend: 'Amend licence',
      updateLicenceHolder: 'Update licence holder',
      upload: 'Upload draft application',
      revoke: 'Revoke licence'
    },
    account: {
      menu: 'Your account',
      update: 'Edit your details',
      updateEmail: {
        base: 'Change your email address',
        confirm: 'Confirm',
        success: 'Success'
      }
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
      confirm: 'Confirm changes'
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
    success: 'Changes saved!'
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
  'view-task': 'View open task'
};
