module.exports = {
  title: 'Review PIL Application',
  status: {
    'ntco-endorsed': {
      action: 'Yes',
      declaration: 'I confirm that the applicant holds the neccessary training or experience to carry out the categories of procedures listed in this application'
    },
    'returned-to-applicant': {
      'with-ntco': 'No'
    },
    resolved: {
      action: 'Grant licence'
    }
  },
  fields: {
    status: {
      'with-ntco': 'Do you endorse this application?'
    },
    comment: {
      label: 'Comments'
    }
  },
  'sticky-nav': {
    training: 'Training',
    exemptions: 'Exemptions',
    procedures: 'Procedure categories',
    status: 'Endorse application decision',
    'status-ntco': 'Endorse application'
  },
  pil: {
    training: {
      title: 'Training',
      certificate: {
        details: 'Certificate details',
        number: 'Certificate number',
        awarded: 'Date awarded',
        expiry: 'Expiry date',
        body: 'Accreditation body',
        file: 'Certificate image'
      },
      modules: 'Modules completed',
      none: 'No training added'
    },
    exemptions: {
      title: 'Exemptions',
      module: 'Module',
      reason: 'Reasons for exemption',
      none: 'No exemptions added'
    },
    procedures: {
      title: 'Procedure categories',
      categories: 'Categories',
      none: 'No procedures selected'
    }
  },
  errors: {
    permissions: `You do not currently have permission to view all people at this establishment. Please contact an
    establishment administrator to increase your permissions level.`
  }
};
