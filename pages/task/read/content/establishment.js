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
        rehomes: 'Setting free and rehoming of protected animals bred, kept or supplied but not used in regulated procedures'
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
  }
};
