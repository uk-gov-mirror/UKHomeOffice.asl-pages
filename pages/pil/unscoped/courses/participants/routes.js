const add = require('./add');
const revoke = require('./revoke');

module.exports = {
  add: {
    path: '/add',
    router: add
  },
  revoke: {
    path: '/:trainingPilId/revoke',
    router: revoke
  }
};
