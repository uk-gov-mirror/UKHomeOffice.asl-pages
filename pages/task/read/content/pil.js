module.exports = {
  status: {
    'returned-to-applicant': {
      'with-ntco': 'No'
    },
    'resubmitted': {
      hint: {
        application: 'Your application will be sent to an NTCO for endorsement',
        amendment: 'Your amendment will be sent to an NTCO for endorsement'
      }
    },
    endorsed: {
      state: 'Awaiting review',
      hint: {
        application: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application.',
        amendment: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this amendment.'
      },
      log: 'Endorsed by'
    }
  },
  fields: {
    status: {
      'with-ntco': ''
    },
    comment: {
      label: 'Comments'
    }
  },
  'sticky-nav': {
    applicant: {
      application: 'Applicant',
      amendment: 'Licence holder',
      revocation: 'Licence holder'
    },
    training: 'Training',
    exemptions: 'Exemptions',
    procedures: 'Procedures',
    species: 'Animal types'
  },
  pil: {
    applicant: {
      over18: 'Applicant over 18?',
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
