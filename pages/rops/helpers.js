const { get, intersection, flatten, uniq } = require('lodash');

function getSpecies(req) {
  const projectSpecies = (get(req, 'project.granted.data.species') || []).filter(s => !s.includes('other'));
  const ropSpecies = flatten(Object.values(get(req, 'rop.species') || {})).filter(s => !s.match(/^other-/));

  const species = req.rop.otherSpecies
    ? projectSpecies.concat(ropSpecies) // user answered yes to "other animal types used" so merge project and rop species
    : (ropSpecies.length > 0 ? ropSpecies : projectSpecies); // otherwise use rops species or fall back to proj species

  return uniq(species);
}

function hasNhps(req, option) {
  const yeps = [
    'marmosets',
    'rhesus',
    'cynomolgus',
    'other-nhps'
  ];
  if (option) {
    return yeps.includes(option);
  }
  if ((get(req, 'rop.species.precoded') || []).includes('other-nhps')) {
    return true;
  }
  const species = getSpecies(req);
  return !!intersection(species, yeps).length;
}

function hasGeneticallyAltered(req) {
  return (get(req.project, 'granted.data.protocols') || []).some(protocol => {
    if (req.project.schemaVersion === 0) {
      return (protocol.species || []).some(s => s['genetically-altered']);
    }
    return protocol.gaas;
  });
}

function hasReUse(req) {
  return (get(req.project, 'granted.data.protocols') || []).some(protocol => {
    return (protocol.speciesDetails || []).some(s => s['reuse']);
  });
}

function hasOtherSpecies(req) {
  return (get(req.project, 'granted.data.species-other') || []).length ||
    (get(req.project, 'granted.data.species') || []).find(s => s.includes('other'));
}

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
  const projectSpecies = get(req, 'rop.project.granted.data.species') || [];
  const ropSpecies = get(req, 'rop.species', {}) || {};
  const ropPrecoded = ropSpecies.precoded || [];
  const ropOthers = flatten(Object.keys(ropSpecies).filter(k => k !== 'precoded').map(k => ropSpecies[k]));

  const hasReqSpecies = !!intersection([...projectSpecies, ...ropPrecoded], nopes).length ||
    !!ropOthers.length;

  const hasReqPob = !!intersection(placesOfBirth, yeps).length;

  return hasReqSpecies && hasReqPob;
}

module.exports = {
  hasNhps,
  hasGeneticallyAltered,
  hasOtherSpecies,
  hasReUse,
  getSpecies,
  schedule2Applicable
};
