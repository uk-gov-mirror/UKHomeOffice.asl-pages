const authorisations = require('../../../establishment/update/content/authorisations');

module.exports = {
  'sticky-nav': {
    diff: 'Amendment requested',
    'approved-areas': 'Approved areas',
    'named-people': 'Named people'
  },
  fields: {
    name: {
      label: 'Name'
    },
    address: {
      label: 'Address'
    },
    country: {
      label: 'Country',
      options: {
        england: 'England',
        wales: 'Wales',
        scotland: 'Scotland',
        ni: 'Northern Ireland'
      }
    },
    licences: {
      label: 'Licensed to carry out',
      options: {
        supplying: 'Supply of relevant protected animals',
        breeding: 'Breeding  of relevant protected animals',
        procedure: 'Regulated scientific procedures on regulated animals'
      }
    },
    isTrainingEstablishment: {
      label: 'Does the establishment run training courses that require Category E personal licences?'
    },
    authorisationTypes: {
      label: 'Authorisations',
      options: {
        killing: 'Methods of killing not specified in Schedule 1',
        rehomes: 'Setting free and rehoming of protected animals'
      }
    },
    conditions: {
      label: 'Additional conditions'
    }
  },
  approvedAreas: {
    total: 'Total approved areas'
  },
  authorisations: {
    ...authorisations,
    previous: 'Previous authorisations',
    new: 'New authorisations'
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
  }
};
