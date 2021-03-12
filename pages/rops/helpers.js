const { get, intersection } = require('lodash');

function hasNhps(req, option) {
  const nopes = [
    'marmosets',
    'rhesus',
    'cynomolgus',
    'other-nhps'
  ];
  if (option) {
    return nopes.includes(option);
  }
  const projectSpecies = get(req, 'project.granted.data.species', []);
  const ropSpecies = get(req, 'rop.species.precoded', []);
  return !!intersection([...projectSpecies, ...ropSpecies], nopes).length;
}

module.exports = {
  hasNhps
};
