const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Personal Licence',
  fields: {
    licenceNumber: { label: 'Licence number' },
    status: { label: 'Status' },
    issueDate: { label: 'Issue date' },
    revocationDate: { label: 'Revocation date' },
    species: { label: 'Animal types' },
    conditions: { label: 'Conditions' },
    procedures: { label: 'Procedures' }
  },
  action: {
    applyNow: 'Apply now',
    backToProfile: 'Back to profile'
  },
  conditions: {
    title: 'Conditions',
    hasConditions: 'In addition to the [standard conditions of Section 2C licences](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/193124/Project_Licence_-_Standard_Conditions.pdf), this establishment will also:',
    noConditions: 'The [standard conditions of Section 2C licences](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/193124/Project_Licence_-_Standard_Conditions.pdf) apply.'
  },
  notifications: {
    'conditions-updated': 'The conditions on this licence have been updated.',
    'update-requested': 'Your update to conditions will be reviewed by a Licensing Officer.'
  }
});
