const training = require('../../../training/content');
const {merge} = require('lodash');

module.exports = merge({}, training, {
  title: 'Training record',
  modules: {
    title: 'Your current training modules',
    hint: 'Confirm training requirements have been met to support an application. This could be through completed training modules or professional experience that makes training unnecessary.',
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
