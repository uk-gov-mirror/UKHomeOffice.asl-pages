const courses = require('./courses');
const list = require('./list');

module.exports = {
  list: {
    path: '/',
    router: list
  },
  courses: {
    path: '/courses',
    router: courses,
    breadcrumb: false
  }
};
