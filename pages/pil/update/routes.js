const species = require('../species');
const procedures = require('../procedures');
const exemptions = require('../exemptions');
const training = require('../training');
const dashboard = require('../dashboard');

module.exports = {
  root: {
    path: '',
    router: dashboard
  },
  species: {
    path: '/species',
    router: species
  },
  procedures: {
    path: '/procedures',
    router: procedures
  },
  exemptions: {
    path: '/exemptions',
    router: exemptions
  },
  training: {
    path: '/training',
    router: training
  }
};
