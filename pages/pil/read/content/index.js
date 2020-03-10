const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Personal licence',
  fields: {
    licenceNumber: { label: 'Licence number' },
    establishment: { label: 'Establishment' },
    status: { label: 'Status' },
    issueDate: { label: 'Issue date' },
    updatedAt: { label: 'Last amended' },
    revocationDate: { label: 'Revocation date' },
    reviewDate: { label: 'Next review due' },
    species: { label: 'Animal types' },
    conditions: { label: 'Conditions' },
    procedures: { label: 'Procedures' }
  },
  action: {
    applyNow: 'Apply now',
    backToProfile: 'Back to profile',
    revoke: {
      summary: `## Revoke licence
        Cancel this licence if it is no longer needed.`,
      button: 'Revoke licence'
    },
    reapply: {
      button: 'Reapply for licence'
    },
    amend: {
      licenceHolder: {
        summary: `## Amend or transfer licence
          Ask for your licence to be amended, or transferred if you’re moving to a new establishment.`,
        button: 'Amend or transfer licence'
      },
      other: {
        summary: `## Amend or transfer licence
          You can ask for this licence to be amended but only the licence-holder can transfer it.`,
        button: 'Amend licence'
      }
    }
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
