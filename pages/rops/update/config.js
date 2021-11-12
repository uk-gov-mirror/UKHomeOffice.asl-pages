const { get, without } = require('lodash');
const { hasNhps, schedule2Applicable } = require('../helpers');

const hasPurpose = purpose => req => {
  const purposes = req.rop.purposes || [];
  return purposes.includes(purpose);
};

function getNilReturn(req) {
  const noProceduresCompleted = get(req, 'form.values.proceduresCompleted', req.rop.proceduresCompleted) === false;
  const noPostnatal = get(req, 'form.values.postnatal', req.rop.postnatal) === false;
  if (noPostnatal || noProceduresCompleted) {
    return req.buildRoute('rops.nil-return');
  }
}

module.exports = {
  procedures: {
    fields: ['proceduresCompleted'],
    section: 'details',
    target: getNilReturn
  },
  postnatal: {
    fields: ['postnatal'],
    section: 'details',
    target: getNilReturn
  },
  endangered: {
    fields: ['endangered', 'endangeredDetails'],
    section: 'details'
  },
  nmbas: {
    fields: ['nmbas', 'generalAnaesthesia', 'generalAnaesthesiaDetails'],
    section: 'details'
  },
  rodenticide: {
    fields: ['rodenticide', 'rodenticideDetails'],
    section: 'details'
  },
  setup: {},
  species: {
    fields: ['otherSpecies', 'species'],
    section: 'animals',
    process: req => {
      if (req.multiStep.values.otherSpecies === false) {
        req.multiStep.values.species = null;
      }
    }
  },
  reuse: {
    fields: ['reuse'],
    section: 'animals'
  },
  birthplace: {
    fields: ['placesOfBirth'],
    section: 'animals',
    locals: (req) => {
      return {
        reuse: req.rop.reuse
      };
    }
  },
  schedule2: {
    fields: ['scheduleTwoDetails'],
    section: 'animals',
    include: schedule2Applicable
  },
  nhps: {
    fields: ['nhpsOrigin', 'nhpsColonyStatus', 'nhpsGeneration'],
    section: 'animals',
    include: hasNhps
  },
  ga: {
    fields: ['ga'],
    section: 'animals'
  },
  purposes: {
    fields: ['purposes'],
    section: 'purposes'
  },
  'basic-subpurposes': {
    fields: ['basicSubpurposes'],
    section: 'purposes',
    include: hasPurpose('basic')
  },
  'translational-subpurposes': {
    fields: ['translationalSubpurposes'],
    section: 'purposes',
    include: hasPurpose('translational')
  },
  'regulatory-subpurposes': {
    fields: ['regulatorySubpurposes'],
    section: 'purposes',
    include: hasPurpose('regulatory')
  },
  'regulatory-legislation': {
    fields: ['regulatoryLegislation', 'regulatoryLegislationOrigin'],
    section: 'purposes',
    include: req => {
      const regulatorySubpurposes = req.rop.regulatorySubpurposes;
      const nopes = [
        'routine-blood',
        'routine-monoclonal',
        'routine-other'
      ];
      return hasPurpose('regulatory')(req) && without(regulatorySubpurposes, ...nopes).length;
    }
  },
  'new-genetic-line': {
    fields: ['newGeneticLine'],
    section: 'purposes',
    include: req => hasPurpose('basic')(req) || hasPurpose('translational')(req)
  },
  'product-testing': {
    fields: ['productTesting'],
    section: 'techniques'
  },
  techniques: {
    fields: ['productTestingTypes'],
    section: 'techniques',
    include: req => !!req.rop.productTesting
  },
  confirm: {
    target: req => {
      const nilReturn = getNilReturn(req);
      if (nilReturn) {
        return nilReturn;
      }
      if (req.redirectTo) {
        return req.buildRoute('rops.update', { step: req.redirectTo });
      }
      return req.buildRoute('rops.procedures');
    }
  }
};
