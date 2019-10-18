const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Personal licence',
  fields: {
    licenceNumber: { label: 'Licence number' },
    status: { label: 'Status' },
    issueDate: { label: 'Issue date' },
    updatedAt: { label: 'Last amended' },
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
    noConditions: '[The standard conditions apply.](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/193122/Personal_Licence_-_Standard_Conditions.pdf)'
  },
  notifications: {
    'conditions-updated': 'The conditions on this licence have been updated.',
    'update-requested': 'Your update to conditions will be reviewed by a Licensing Officer.'
  }
});
