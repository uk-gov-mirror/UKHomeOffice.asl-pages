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

module.exports = {
  hasNhps
};
