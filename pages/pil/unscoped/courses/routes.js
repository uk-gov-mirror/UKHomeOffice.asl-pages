const create = require('./create');
const read = require('./read');
const update = require('./update');
const list = require('./list');
const getAutocompleteProjects = require('./routers/get-autocomplete-projects');
const deleteTrainingCourse = require('./routers/delete-training-course');

module.exports = {
  'autocomplete-projects': {
    path: '/get-autocomplete-projects',
    router: getAutocompleteProjects
  },
  list: {
    path: '/',
    router: list
  },
  create: {
    path: '/new',
    router: create
  },
  read: {
    path: '/:trainingCourseId',
    router: read
  },
  delete: {
    path: '/:trainingCourseId/delete',
    router: deleteTrainingCourse
  },
  update: {
    path: '/:trainingCourseId/edit',
    router: update
  }
};
