const dictionary = require('@ukhomeoffice/asl-dictionary');

module.exports = {
  site: {
    label: 'Site'
  },
  area: {
    label: 'Area',
    hint: 'For example, a building, a floor, or a field'
  },
  name: {
    label: 'Name',
    hint: 'Please provide a unique identifier'
  },
  suitability: {
    label: 'Suitability'
  },
  holding: {
    label: 'Holding'
  },
  nacwos: {
    label: `${dictionary.NACWO}s (NACWOs)`
  },
  nvssqps: {
    label: `${dictionary.NVS} (NVS) or ${dictionary.SQP} (SQP)`
  },
  restrictions: {
    label: 'Restrictions',
    currentLabel: 'Current restrictions',
    proposedLabel: 'Proposed restrictions'
  },
  comments: {
    label: 'Why are you making this amendment?',
    hint: 'Comments can be seen by establishment users, as well as inspectors and Home Office team members.'
  }
};
