const fields = require('./fields');

module.exports = {
  fields,
  errors: {
    authorisationTypes: {
      definedValues: 'Invalid option, select from the list of available authorisations.'
    },
    licences: {
      definedValues: 'Invalid option, select from the list of available options.'
    },
    comments: {
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
  }
};
