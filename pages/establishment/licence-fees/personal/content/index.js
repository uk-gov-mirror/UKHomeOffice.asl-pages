const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Billable personal licences',
  fields: {
    licenceHolder: {
      label: 'PIL holder'
    },
    licenceNumber: {
      label: 'PIL number'
    },
    issueDate: {
      label: 'Start date',
      tooltip: 'Start date, when the licence was granted at or transfered to this establishment'
    },
    revocationDate: {
      label: 'End date',
      tooltip: 'End date, when the licence was revoked at or transfered away from this establishment'
    }
  }
});
