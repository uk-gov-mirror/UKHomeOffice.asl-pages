module.exports = {
  status: {
    'ntco-endorsed': {
      action: 'Yes',
      declaration: {
        application: 'I confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application',
        amendment: 'I confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this amendment'
      }
    },
    'returned-to-applicant': {
      'with-ntco': 'No'
    }
  },
  fields: {
    status: {
      'with-ntco': {
        amendment: 'Do you endorse this amendment?',
        application: 'Do you endorse this application?'
      }
    },
    comment: {
      label: 'Comments'
    }
  },
  'sticky-nav': {
    applicant: 'Applicant',
    training: 'Training',
    exemptions: 'Exemptions',
    procedures: 'Procedures',
    species: 'Animal types',
    'status-ntco': 'Endorse {{type}}'
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
      none: 'No procedures selected',
      evidence: 'Evidence of competency',
      type: 'Type of regulated procedure',
      noEvidence: 'No evidence provided',
      noType: 'No type provided'
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
