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
    startDate: {
      label: 'Start date',
      tooltip: 'Start date, when the licence was granted at or transfered to this establishment'
    },
    endDate: {
      label: 'End date',
      tooltip: 'End date, when the licence was revoked at or transfered away from this establishment'
    },
    waived: {
      label: 'Billable'
    },
    comment: {
      label: 'What is the reason for this change?'
    }
  },
  errors: {
    comments: {
      required: 'Please add a comment explaining why you are making this change.'
    }
  },
  notifications: {
    success: 'Personal licence billing status updated.'
  },
  change: 'Change the billing status of this licence'
});
