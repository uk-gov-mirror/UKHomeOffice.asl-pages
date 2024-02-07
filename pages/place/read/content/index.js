const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  action: {
    amend: {
      summary: `## Amend area
All changes require approval except for the reassignment of named people.`,
      button: 'Amend area'
    },
    remove: {
      summary: `## Remove area
This area will no longer be approved to carry out regulated procedures on animals.`,
      button: 'Remove area'
    }
  }
});
