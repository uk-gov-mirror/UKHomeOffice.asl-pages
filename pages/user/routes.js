const menu = require('./menu');
const update = require('./update');
const updateEmail = require('./update-email');
const updatePassword = require('./update-password');
const emailPreferences = require('./email-preferences');

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
  },
  updatePassword: {
    path: '/update-password',
    router: updatePassword
  },
  emailPreferences: {
    path: '/email-preferences',
    router: emailPreferences
  }
};
