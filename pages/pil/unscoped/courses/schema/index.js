const { toArray } = require('../../../../../lib/utils');

module.exports = {
  projectTitle: {
    accessor: 'project.title'
  },
  title: {
    inputType: 'inputText',
    show: true,
    validate: [
      'required'
    ]
  },
  startDate: {
    inputType: 'inputDate',
    show: true,
    validate: [
      'required',
      'validDate',
      { dateIsAfter: 'now' }
    ]
  },
  species: {
    inputType: 'speciesSelector',
    formatNullValue: true,
    format: toArray,
    nullValue: [],
    validate: [
      'required'
    ]
  },
  projectId: {
    inputType: 'autoComplete',
    accessor: 'project.id',
    options: [],
    apiPath: 'pils.courses.autocomplete-projects',
    validate: [
      'required'
    ]
  }
};
