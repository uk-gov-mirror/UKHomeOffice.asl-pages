const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  pageTitle: 'Training courses',
  subtitle: 'Apply for category E licences on behalf of people attending a course.',
  buttons: {
    add: 'Add course details'
  },
  fields: {
    title: {
      label: 'Course title'
    },
    applications: {
      label: 'Participants added'
    },
    licences: {
      label: 'Licences granted'
    }
  },
  'cannot-update': 'No training courses have been added, you’ll need to contact an Admin user or NTCO at your establishment if you wish to add a training course.'
});
