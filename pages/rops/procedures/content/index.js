const { merge } = require('lodash');
const { fields, guidance } = require('../../update/content/index');

module.exports = merge({}, { fields, guidance }, {
  ropHeader: {
    title: 'Return of procedures {{year}}'
  },
  change: {
    title: '{{#canEdit}}Change set{{/canEdit}}{{^canEdit}}Set{{/canEdit}} up details',
    content: 'View {{#canEdit}}and edit {{/canEdit}}details used to set up this return.',
    summary: 'Show set up details'
  },
  procedures: {
    title: 'Procedures',
    content: 'Add procedures completed in {{year}}.',
    add: 'Add procedures'
  },
  fields: {
    ga: {
      options: {
        'no-ga': 'GAA were not used',
        'ga-not-harmful': 'GAA without a harmful phenotype were used',
        'ga-harmful': 'GAA with harmful phenotype were used'
      }
    },
    severity: {
      label: 'Select actual severities and enter number of procedures',
      hint: 'Severities are those experienced by animals as a result of the procedure.',
      summary: 'Reporting re-use, tiny animals, NHPs and large numbers over 999',
      options: {
        sub: 'Sub-threshold',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        non: 'Non-recovery'
      }
    }
  },
  submit: {
    title: 'Submit return',
    content: 'Submit this project\'s completed return of procedures.',
    action: 'Submit return',
    'cannot-submit': 'Only the PPL holder or an admin can submit this to the Home Office.'
  },
  unsubmit: {
    title: 'Correct return',
    content: 'Recall and resubmit this return if there are errors.',
    action: 'Correct return'
  },
  notifications: {
    success: 'Return updated.'
  },
  errors: {
    species: {
      required: 'Select an animal type'
    },
    endangered: {
      required: 'Select an endangered species option'
    },
    endangeredDetails: {
      required: 'Enter details of the endangered species used'
    },
    ga: {
      required: 'Select the animals’ genetic status'
    },
    newGeneticLine: {
      required: 'Select if a new genetic line was created'
    },
    purposes: {
      required: 'Select a purpose'
    },
    severity: {
      required: 'Select a severity'
    },
    basicSubpurposes: {
      required: 'Select a sub-purpose'
    },
    regulatorySubpurposes: {
      required: 'Select a sub-purpose'
    },
    regulatoryLegislation: {
      required: 'Select the applicable legislation'
    },
    regulatoryLegislationOrigin: {
      required: 'Select the origin of the legislation'
    },
    translationalSubpurposes: {
      required: 'Select a sub-purpose'
    }
  }
});
