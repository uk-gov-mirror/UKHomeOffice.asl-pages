const { merge } = require('lodash');
const place = require('../../../place/content');

module.exports = merge({}, place, {
  title: {
    /* overwrites title property from place content with an emptyobject for a safe merge */
  },
  'sticky-nav': {
    create: 'Approved area to add',
    delete: 'Approved area to remove',
    diff: 'Amendment details',
    restrictions: 'Restrictions',
    'changes-to-restrictions': 'Requested changes to restrictions',
    'new-restrictions': 'New restrictions',
    conditions: 'Establishment conditions'
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
    }
  },
  conditions: {
    title: 'Conditions',
    hasConditions: 'In addition to the [standard conditions of Section 2C licences](https://www.gov.uk/government/publications/establishment-licence-standard-conditions/establishment-licence-standard-conditions):',
    noConditions: 'The [standard conditions of Section 2C licences](https://www.gov.uk/government/publications/establishment-licence-standard-conditions/establishment-licence-standard-conditions) apply.'
  },
  reminders: {
    title: 'Condition deadline',
    set: 'Set a reminder for deadlines associated with this condition',
    hint: 'Licence holders will receive reminders a month before, a week before and on the day the condition is due to be met. ASRU will receive a reminder when the deadline has passed.'
  },
  buttons: {
    save: 'Save'
  },
  comment: {
    label: 'Comments'
  }
});
