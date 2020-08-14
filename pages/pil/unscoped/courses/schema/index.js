const { toArray } = require('../../../../../lib/utils');

module.exports = {
  projectTitle: {
    accessor: 'project.title'
  },
  title: {
    inputType: 'inputText',
    show: true
  },
  startDate: {
    inputType: 'inputDate',
    show: true
  },
  species: {
    inputType: 'speciesSelector',
    format: toArray,
    nullValue: []
  },
  projectId: {
    inputType: 'autoComplete',
    accessor: 'project.id',
    options: [],
    apiPath: 'pils.courses.autocomplete-projects'
  }
};
