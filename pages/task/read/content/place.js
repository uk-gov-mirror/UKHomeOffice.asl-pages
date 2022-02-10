const { merge } = require('lodash');
const place = require('../../../place/content');

module.exports = merge({}, place, {
  title: {
    /* overwrites title property from place content with an emptyobject for a safe merge */
  },
  'sticky-nav': {
    details: 'Establishment details',
    create: 'Approved area to add',
    delete: 'Approved area to remove',
    diff: 'Amendment details',
    restrictions: 'Restrictions',
    'changes-to-restrictions': 'Requested changes to restrictions',
    'new-restrictions': 'New restrictions'
  },
  fields: {
    changesToRestrictions: {
      label: 'Requested changes to restrictions'
    },
    restrictions: {
      currentLabel: 'Current restrictions',
      proposedLabel: 'Proposed restrictions',
      previousLabel: 'Previous restrictions',
      newLabel: 'New restrictions'
    },
    comment: {
      label: 'Comments'
    }
  }
});
