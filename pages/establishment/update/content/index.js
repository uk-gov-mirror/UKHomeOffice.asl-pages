const fields = require('./fields');

module.exports = {
  fields,
  errors: {
    authorisations: {
      definedValues: 'Invalid option, select from the list of available authorisations.'
    },
    comments: {
      required: 'Please provide a reason for making this change.'
    }
  }
};
