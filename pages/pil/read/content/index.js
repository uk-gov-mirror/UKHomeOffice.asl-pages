const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Personal Licence',
  fields: {
    licenceNumber: { label: 'Licence number' },
    status: { label: 'Status' },
    issueDate: { label: 'Issue date' },
    revocationDate: { label: 'Revocation date' },
    conditions: { label: 'Conditions' },
    procedures: { label: 'Procedures' }
  },
  action: {
    applyNow: 'Apply now',
    backToProfile: 'Back to profile'
  }
});
