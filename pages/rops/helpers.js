const { get, intersection } = require('lodash');

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
  const projectSpecies = get(req, 'project.granted.data.species') || [];
  const ropSpecies = get(req, 'rop.species.precoded') || [];
  return !!intersection([...projectSpecies, ...ropSpecies], yeps).length;
}

function hasGeneticallyAltered(req) {
  if (req.project.schemaVersion === 0) {
    return (get(req.project, 'granted.data.protocols') || []).some(protocol => {
      return (protocol.species || []).some(s => s['genetically-altered']);
    });
  }
  return get(req.project, 'granted.data.ga', false);
}

function hasOtherSpecies(req) {
  return (get(req.project, 'granted.data.species-other') || []).length ||
    (get(req.project, 'granted.data.species') || []).find(s => s.includes('other'));
}

module.exports = {
  hasNhps,
  hasGeneticallyAltered,
  hasOtherSpecies
};
