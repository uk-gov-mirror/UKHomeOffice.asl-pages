const menu = require('./menu');
const update = require('./update');
const updateEmail = require('./update-email');

module.exports = {
  menu: {
    path: '',
    router: menu
  },
  update: {
    path: '/edit',
    router: update
  },
  updateEmail: {
    path: '/update-email',
    router: updateEmail
  }
};
