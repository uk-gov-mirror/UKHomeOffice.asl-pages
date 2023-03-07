const fields = require('./fields');

module.exports = {
  fields,
  errors: {
    name: {
      required: 'Establishment name cannot be empty.'
    },
    corporateStatus: {
      required: 'Please enter the type of your new establishment'
    },
    legalName: {
      required: 'Individual legally accountable for the corporate entity name cannot be empty.'
    },
    legalPhone: {
      required: 'Individual legally accountable for the corporate entity phone cannot be empty.'
    },
    legalEmail: {
      required: 'Individual legally accountable for the corporate entity email cannot be empty.'
    },
    pelh: {
      required: 'Please select an Establishment Licence Holder (PELH)'
    },
    nprc: {
      required: 'Please select a Named Person Responsible for Compliance (NPRC)'
    },
    address: {
      required: 'Please provide an address.'
    },
    authorisationTypes: {
      definedValues: 'Invalid option, select from the list of available authorisations.'
    },
    licences: {
      definedValues: 'Invalid option, select from the list of available options.'
    },
    comment: {
      required: 'Please provide a reason for making this change.'
    }
  },
  action: {
    repeat: {
      add: 'Add another',
      remove: 'Remove'
    }
  },
  repeat: {
    title: 'Method {{index}}'
  },
  buttons: {
    submit: 'Continue'
  }
};
