const { merge } = require('lodash');
const base = require('./index');

module.exports = merge({}, base, {
  description: 'Please check your answers.',
  warning: `Continuing will create a partial record of this licence that establishment users can see, but not amend,
until all details have been added.`,
  buttons: {
    submit: 'Create partial record',
    edit: 'Change'
  }
});
