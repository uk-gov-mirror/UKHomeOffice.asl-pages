const { merge } = require('lodash');
const content = require('../../content');

module.exports = merge({}, content, {
  title: 'Contact information for billing',
  fields: {
    contactName: {
      label: 'Billing contact'
    },
    contactNumber: {
      label: 'Contact number'
    },
    contactEmail: {
      label: 'Contact email address'
    },
    contactAddress: {
      label: 'Billing address'
    },
    purchaseOrder: {
      label: 'Purchase order number'
    },
    otherInformation: {
      label: 'Any other billing information'
    }
  },
  actions: {
    editLink: 'Edit'
  }
});
