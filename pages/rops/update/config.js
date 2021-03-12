const { get, intersection, flatten } = require('lodash');
const { hasNhps } = require('../helpers');

function schedule2Applicable(req, placesOfBirth = []) {
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
  const projectSpecies = get(req, 'rop.project.granted.data.species', []);
  const ropSpecies = get(req, 'rop.species', {});
  const ropPrecoded = ropSpecies.precoded || [];
  const ropOthers = flatten(Object.keys(ropSpecies).filter(k => k !== 'precoded').map(k => ropSpecies[k]));

  const hasReqSpecies = !!intersection([...projectSpecies, ...ropPrecoded], nopes).length ||
    !!ropOthers.length;

  const hasReqPob = !!intersection(placesOfBirth, yeps).length;

  return hasReqSpecies && hasReqPob;
}

module.exports = {
  procedures: {
    fields: ['proceduresCompleted'],
    section: 'details',
    target: req => {
      if (!req.form.values.proceduresCompleted) {
        return req.buildRoute('rops.nil-return');
      }
      return req.buildRoute('rops.update', { step: 'postnatal' });
    }
  },
  postnatal: {
    fields: ['postnatal'],
    section: 'details',
    target: req => {
      if (!req.form.values.postnatal) {
        return req.buildRoute('rops.nil-return');
      }
      return req.buildRoute('rops.update', { step: 'endangered' });
    }
  },
  endangered: {
    fields: ['endangered', 'endangeredDetails'],
    section: 'details',
    target: req => req.buildRoute('rops.update', { step: 'nmbas' })
  },
  nmbas: {
    fields: ['nmbas', 'generalAnaesthesia', 'generalAnaesthesiaDetails'],
    section: 'details',
    target: req => req.buildRoute('rops.update', { step: 'rodenticide' })
  },
  rodenticide: {
    fields: ['rodenticide', 'rodenticideDetails'],
    section: 'details',
    target: req => req.buildRoute('rops.update', { step: 'setup' })
  },
  setup: {
    target: req => req.buildRoute('rops.update', { step: 'product-testing' })
  },
  'product-testing': {
    fields: ['productTesting'],
    section: 'general',
    target: req => req.buildRoute('rops.update', { step: 'species' })
  },
  species: {
    fields: ['otherSpecies', 'species'],
    section: 'animals',
    target: req => req.buildRoute('rops.update', { step: 'reuse' })
  },
  reuse: {
    fields: ['reuse'],
    section: 'animals',
    target: req => req.buildRoute('rops.update', { step: 'birthplace' })
  },
  birthplace: {
    fields: ['placesOfBirth'],
    section: 'animals',
    locals: (req) => {
      return {
        reuse: req.rop.reuse
      };
    },
    target: req => {
      if (schedule2Applicable(req, req.form.values.placesOfBirth)) {
        return req.buildRoute('rops.update', { step: 'schedule2' });
      }
      if (hasNhps(req)) {
        return req.buildRoute('rops.update', { step: 'nhps' });
      }
      return req.buildRoute('rops.update', { step: 'ga' });
    }
  },
  schedule2: {
    fields: ['scheduleTwoDetails'],
    section: 'animals',
    target: req => {
      if (hasNhps(req)) {
        return req.buildRoute('rops.update', { step: 'nhps' });
      }
      return req.buildRoute('rops.update', { step: 'ga' });
    }
  },
  nhps: {
    fields: ['nhpsOrigin', 'nhpsColonyStatus', 'nhpsGeneration'],
    section: 'animals',
    target: req => req.buildRoute('rops.update', { step: 'ga' })
  },
  ga: {
    fields: ['ga'],
    section: 'animals',
    target: req => req.buildRoute('rops.update', { step: 'purposes' })
  },
  purposes: {
    fields: ['purposes'],
    section: 'purposes',
    target: req => {
      const purposes = req.form.values.purposes;
      if (purposes.includes('basic')) {
        return req.buildRoute('rops.update', { step: 'basic-subpurposes' });
      }
      if (purposes.includes('regulatory')) {
        return req.buildRoute('rops.update', { step: 'regulatory-subpurposes' });
      }
      if (purposes.includes('translational')) {
        return req.buildRoute('rops.update', { step: 'translational-subpurposes' });
      }
      return req.buildRoute('rops.update', { step: 'new-genetic-line' });
    }
  },
  'basic-subpurposes': {
    fields: ['basicSubpurposes'],
    section: 'purposes',
    target: req => {
      const purposes = req.rop.purposes;
      if (purposes.includes('regulatory')) {
        return req.buildRoute('rops.update', { step: 'regulatory-subpurposes' });
      }
      if (purposes.includes('translational')) {
        return req.buildRoute('rops.update', { step: 'translational-subpurposes' });
      }
      return req.buildRoute('rops.update', { step: 'new-genetic-line' });
    }
  },
  'regulatory-subpurposes': {
    fields: ['regulatorySubpurposes'],
    section: 'purposes',
    target: req => {
      const purposes = req.rop.purposes;
      const regulatorySubpurposes = req.form.values.regulatorySubpurposes;
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
      if (intersection(regulatorySubpurposes, nopes).length) {
        return req.buildRoute('rops.update', { step: 'regulatory-legislation' });
      }
      if (purposes.includes('translational')) {
        return req.buildRoute('rops.update', { step: 'translational-subpurposes' });
      }
      return req.buildRoute('rops.update', { step: 'new-genetic-line' });
    }
  },
  'regulatory-legislation': {
    fields: ['regulatoryLegislation', 'regulatoryLegislationOrigin'],
    section: 'purposes',
    target: req => {
      const purposes = req.rop.purposes;
      if (purposes.includes('translational')) {
        return req.buildRoute('rops.update', { step: 'translational-subpurposes' });
      }
      return req.buildRoute('rops.update', { step: 'new-genetic-line' });
    }
  },
  'translational-subpurposes': {
    fields: ['translationalSubpurposes'],
    section: 'purposes',
    target: req => req.buildRoute('rops.update', { step: 'new-genetic-line' })
  },
  'new-genetic-line': {
    fields: ['newGeneticLine'],
    section: 'purposes',
    target: req => {
      const productTesting = req.rop.productTesting;
      if (productTesting) {
        return req.buildRoute('rops.update', { step: 'techniques' });
      }
      return req.buildRoute('rops.update', { step: 'confirm' });
    }
  },
  techniques: {
    fields: ['productTestingTypes'],
    section: 'techniques',
    target: req => req.buildRoute('rops.update', { step: 'confirm' })
  },
  confirm: {
    target: req => req.buildRoute('rops.procedures')
  }
};
