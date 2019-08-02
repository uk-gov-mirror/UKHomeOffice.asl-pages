const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Personal licence',
  fields: {
    licenceNumber: { label: 'Licence number' },
    status: { label: 'Status' },
    issueDate: { label: 'Issue date' },
    revocationDate: { label: 'Revocation date' },
    species: { label: 'Animal types' },
    conditions: { label: 'Conditions' },
    procedures: { label: 'Procedures' }
  },
  cantUpdate: '**You can\'t amend this PIL as it is held at another establishment**',
  action: {
    applyNow: 'Apply now',
    backToProfile: 'Back to profile',
    revoke: 'Revoke licence',
    reapply: 'Reapply for licence',
    amend: 'Amend licence'
  },
  conditions: {
    title: 'Conditions',
    hasConditions: 'In addition to the standard conditions:',
    noConditions: 'The standard conditions apply'
  },
  notifications: {
    'conditions-updated': 'The conditions on this licence have been updated.',
    'update-requested': 'Your update to conditions will be reviewed by a Licensing Officer.'
  }
});
