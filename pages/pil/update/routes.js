const species = require('../species');
const procedures = require('../procedures');
const training = require('../training');
const dashboard = require('../dashboard');
const establishment = require('../establishment');

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
  training: {
    path: '/training',
    router: training
  },
  establishment: {
    path: '/establishment',
    router: establishment
  }
};
