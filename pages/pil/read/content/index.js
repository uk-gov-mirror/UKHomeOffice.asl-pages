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
          You can ask for this licence to be amended but only the licence holder can transfer it.`,
        button: 'Amend licence'
      }
    }
  },
  conditions: {
    title: 'Conditions',
    hasConditions: 'In addition to the standard conditions:',
    noConditions: '[The standard conditions apply.](https://www.gov.uk/government/publications/personal-licence-standard-conditions/personal-licence-standard-conditions)'
  },
  notifications: {
    'conditions-updated': 'The conditions on this licence have been updated.',
    'update-requested': 'Your update to conditions will be reviewed by a Licensing Officer.'
  },
  warnings: {
    pilReviewRequired: `**This personal licence is {{#overdue}}overdue{{/overdue}}{{^overdue}}due{{/overdue}} a 5 year review**

    {{#openTask}}
      Someone has checked the licence to verify that it’s up to date, but it’s still waiting to be approved.
    {{/openTask}}
    {{^openTask}}
      It needs to be [confirmed as up to date and in use]({{reviewUrl}}), or amended to remove procedures or animal types that aren’t being used.
    {{/openTask}}`
  }
});
