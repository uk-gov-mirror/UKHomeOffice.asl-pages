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
    format: JSON.parse,
    validate: [
      'required'
    ]
  },
  establishment: {
    accessor: 'establishment.name'
  },
  projectId: {
    inputType: 'autoComplete',
    accessor: 'project.id',
    options: [],
    apiPath: 'pils.courses.autocomplete-projects',
    formatNullValue: true,
    validate: [
      'required'
    ]
  }
};
