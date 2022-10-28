const { merge } = require('lodash');
const baseContent = require('../../../pil/content');
const fields = require('../../../pil/unscoped/courses/content/fields');

module.exports = merge({}, baseContent, {
  title: {
    review: 'Endorse personal licence review'
  },
  status: {
    'returned-to-applicant': {
      'with-ntco': 'No',
      hint: {
        review: 'You will be able to add comments explaining what needs to happen next.'
      }
    },
    'resubmitted': {
      action: {
        review: 'Resubmit review'
      },
      hint: {
        application: 'Your application will be sent to an NTCO for endorsement',
        amendment: 'Your amendment will be sent to an NTCO for endorsement',
        updateConditions: 'Your amendment will be reviewed by a licensing officer',
        review: 'Your request will be reviewed by a named training and competency officer'
      }
    },
    'recalled-by-applicant': {
      hint: {
        review: 'You will be able to add any comments and resubmit your request for review.'
      }
    },
    endorsed: {
      state: 'Awaiting decision',
      hint: {
        application: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this application.',
        amendment: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this amendment.',
        transfer: 'You confirm that the applicant holds the necessary training or experience to carry out the categories of procedures listed in this transfer request.',
        review: 'Confirm the licence is in use and only includes relevant animal types and procedures.'
      },
      log: 'Endorsed by'
    }
  },
  fields: {
    ...fields,
    status: {
      label: '',
      'with-ntco': ''
    },
    comment: {
      label: 'Comments'
    }
  },
  'sticky-nav': {
    applicant: {
      application: 'Applicant',
      other: 'Licence holder'
    },
    training: 'Training',
    exemptions: 'Exemptions',
    procedures: 'Procedures',
    species: 'Animal types',
    transfer: 'Establishment transfer'
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
      none: 'No training added',
      species: 'Animal types'
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
    },
    establishment: {
      current: 'Current establishment',
      proposed: 'Proposed establishment'
    }
  },
  warning: {
    ntcoOwnPil: `You can’t endorse your own application for a personal licence.

      A second NTCO is required to endorse your application.`
  },
  errors: {
    permissions: `You do not currently have permission to view all people at this establishment. Please contact an
    establishment administrator to increase your permissions level.`
  }
});
