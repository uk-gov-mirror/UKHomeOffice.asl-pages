const { get, intersection, flatten } = require('lodash');
const { hasNhps } = require('../helpers');

function schedule2Applicable(req) {
  const placesOfBirth = req.rop.placesOfBirth;
  const nopes = [
    'mice',
    'rats',
    'guinea-pigs',
    'hamsters',
    'gerbils',
    'rabbits',
    'cats',
    'dogs',
    'ferrets',
    'other-domestic-fowl',
    'other-birds',
    'common-frogs',
    'african-frogs',
    'other-amphibians',
    'zebra-fish',
    'pigs',
    'sheep'
  ];
  const yeps = [
    'uk-non-licenced',
    'eu-non-registered',
    'europe',
    'rest-of-world'
  ];
  const projectSpecies = get(req, 'rop.project.granted.data.species', []) || [];
  const ropSpecies = get(req, 'rop.species', {}) || {};
  const ropPrecoded = ropSpecies.precoded || [];
  const ropOthers = flatten(Object.keys(ropSpecies).filter(k => k !== 'precoded').map(k => ropSpecies[k]));

  const hasReqSpecies = !!intersection([...projectSpecies, ...ropPrecoded], nopes).length ||
    !!ropOthers.length;

  const hasReqPob = !!intersection(placesOfBirth, yeps).length;

  return hasReqSpecies && hasReqPob;
}

const hasPurpose = purpose => req => {
  const purposes = req.rop.purposes || [];
  return purposes.includes(purpose);
};

module.exports = {
  procedures: {
    fields: ['proceduresCompleted'],
    section: 'details',
    target: req => {
      if (!req.form.values.proceduresCompleted) {
        return req.buildRoute('rops.nil-return');
      }
    }
  },
  postnatal: {
    fields: ['postnatal'],
    section: 'details',
    target: req => {
      if (!req.form.values.postnatal) {
        return req.buildRoute('rops.nil-return');
      }
    }
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
  'product-testing': {
    fields: ['productTesting'],
    section: 'general'
  },
  species: {
    fields: ['otherSpecies', 'species'],
    section: 'animals'
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
        'qc-batch-safety',
        'qc-pyrogenicity',
        'qc-batch-potency',
        'qc-other',
        'other-efficacy',
        'toxicity-ld50',
        'toxicity-other-lethal',
        'toxicity-non-lethal',
        'toxicity-skin'
      ];
      return hasPurpose('regulatory')(req) && intersection(regulatorySubpurposes, nopes).length;
    }
  },
  'translational-subpurposes': {
    fields: ['translationalSubpurposes'],
    section: 'purposes',
    include: hasPurpose('translational')
  },
  'new-genetic-line': {
    fields: ['newGeneticLine'],
    section: 'purposes'
  },
  techniques: {
    fields: ['productTestingTypes'],
    section: 'techniques',
    include: req => !!req.rop.productTesting
  },
  confirm: {
    target: req => req.buildRoute('rops.procedures')
  }
};
