const { get, intersection, flatten } = require('lodash');

function getSpecies(req) {
  const projectSpecies = (get(req, 'project.granted.data.species') || []).filter(s => !s.includes('other'));
  const ropSpecies = flatten(Object.values(get(req, 'rop.species') || {})).filter(s => !s.match(/^other-/));

  return req.rop.otherSpecies
    ? projectSpecies.concat(ropSpecies) // user answered yes to "other animal types used" so merge project and rop species
    : (ropSpecies.length > 0 ? ropSpecies : projectSpecies); // otherwise use rops species or fall back to proj species
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

module.exports = {
  hasNhps,
  hasGeneticallyAltered,
  hasOtherSpecies,
  hasReUse,
  getSpecies
};
