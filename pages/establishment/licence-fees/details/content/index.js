const { merge } = require('lodash');
const content = require('../../content');

module.exports = merge({}, content, {
  title: 'Contact information for billing',
  fields: {
    contactName: {
      label: 'Billing contact name'
    },
    contactNumber: {
      label: 'Telephone number'
    },
    contactEmail: {
      label: 'Email address'
    },
    contactAddress: {
      label: 'Billing address'
    },
    hasPurchaseOrder: {
      label: 'Do you have a purchase order number?',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    },
    purchaseOrder: {
      label: 'Purchase order number'
    },
    alternativePaymentMethod: {
      label: 'Provide details for your payment method'
    },
    otherInformation: {
      label: 'Other billing information (optional)'
    },
    declaredCurrent: {
      label: 'These details are correct for the period {{ currentPeriod }}'
    }
  },
  errors: {
    contactName: {
      required: 'Enter a contact name'
    },
    contactNumber: {
      required: 'Enter a telephone number'
    },
    contactEmail: {
      required: 'Enter an email address'
    },
    contactAddress: {
      required: 'Enter an address'
    },
    purchaseOrder: {
      required: 'Enter a purchase order number'
    },
    alternativePaymentMethod: {
      required: 'Enter details for your payment method'
    },
    declaredCurrent: {
      required: 'Select to confirm that all details are up to date'
    }
  },
  actions: {
    editLink: 'Edit'
  }
});
