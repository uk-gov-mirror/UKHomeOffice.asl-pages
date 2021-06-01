const { merge } = require('lodash');
const { fields } = require('../../update/content/index');

module.exports = merge({}, { fields }, {
  title: 'Return of procedures {{year}}',
  change: {
    title: '{{#canEdit}}Change{{/canEdit}}{{^canEdit}}View{{/canEdit}} setup details',
    content: 'View {{#canEdit}}and edit {{/canEdit}}details used to set up this return.',
    summary: 'Show setup details'
  },
  procedures: {
    title: 'Procedures',
    content: 'Add procedures completed in {{year}}',
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
        non: 'Non recovery',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe'
      }
    }
  },
  submit: {
    title: 'Submit return',
    content: 'Submit this project\'s completed return of procedures',
    action: 'Submit return',
    'cannot-submit': 'Only the PPL holder or an admin can submit this to the Home Office.'
  },
  unsubmit: {
    title: 'Correct return',
    content: 'Tell the Home Office if there are errors in this return.',
    action: 'Correct return'
  },
  notifications: {
    success: 'Return updated.'
  }
});
