const training = require('../../../training/content');
const {merge} = require('lodash');

module.exports = merge({}, training, {
  title: 'Training record',
  modules: {
    title: 'Your current training modules',
    add: 'Add training or exemption'
  },
  actions: {
    remove: 'Delete'
  },
  resume: 'Resume application',
  pil: 'Personal licence',
  'draft-projects': 'Draft projects',
  'active-projects': 'Active projects'
});
