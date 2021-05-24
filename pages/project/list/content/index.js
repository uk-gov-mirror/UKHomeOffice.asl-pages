const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Projects',
  details: {
    summary: 'I can\'t find the project I need',
    content: `If you want to view a project you don't have access to, you'll need to ask an [admin]({{adminListUrl}}) to give you access.`
  },
  searchText: 'Search by project title, licence holder or licence number',
  buttons: {
    create: 'Apply for project licence',
    upload: 'Use existing template'
  },
  actions: {
    downloadAll: 'Download all project data (CSV)'
  },
  countdown: {
    expired: '{{diff}} days overdue'
  }
});
