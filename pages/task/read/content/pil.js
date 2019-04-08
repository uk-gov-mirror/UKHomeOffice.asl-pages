module.exports = {
  title: 'Review PIL application',
  status: {
    'ntco-endorsed': {
      action: 'Yes',
      declaration: 'I confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application'
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
    applicant: 'Applicant',
    training: 'Training',
    exemptions: 'Exemptions',
    procedures: 'Procedure categories',
    species: 'Animal types',
    'status-ntco': 'Endorse application'
  },
  pil: {
    applicant: {
      dob: 'Date of birth',
      missingDob: 'unknown'
    },
    training: {
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
      module: 'Module',
      reason: 'Reasons for exemption',
      none: 'No exemptions added'
    },
    procedures: {
      categories: 'Categories',
      none: 'No procedures selected'
    },
    species: {
      none: 'No animal types selected'
    }
  },
  errors: {
    permissions: `You do not currently have permission to view all people at this establishment. Please contact an
    establishment administrator to increase your permissions level.`
  }
};
