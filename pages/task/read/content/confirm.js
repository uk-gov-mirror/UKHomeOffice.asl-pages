const { merge, pick } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');
const versionContent = require('../../../project-version/update/endorse/content');
const refusalNotice = require('./refusal-notice');

module.exports = merge({}, baseContent, {
  tasks,
  title: 'Confirm decision',
  fields: {
    status: {
      label: 'Your decision'
    },
    endorsement: {
      label: 'Endorsement'
    },
    restrictions: {
      label: 'Restrictions'
    },
    ...pick(versionContent.fields, ['awerb', 'awerb-review-date', 'awerb-exempt', 'awerb-dates', 'awerb-no-review-reason'])
  },
  declaration: {
    title: 'Declaration',
    endorsed: {
      pil: `By endorsing this {{type}}, I agree that:
         * I have the authority of the establishment licence holder, and they are aware that this establishment will
         have financial responsibility for this personal licence if granted.`,
      project: `By endorsing this {{type}}, I agree that:
        * {{name}}'s training record is accurate and up to date.
        * The non-technical summary uses everyday language and contains no information that could identify people, places or intellectual property.`,
      trainingPil: `By endorsing this {{type}}, I agree that:
        * {{name}} will receive all relevant training before carrying out regulated procedures on protected animals as part of this course.
        * I have the authority of the establishment licence holder and they are aware they will be liable for the licence's cost.`
    }
  },
  errors: {
    ...pick(versionContent.errors, ['awerb', 'awerb-review-date', 'awerb-exempt', 'awerb-dates', 'awerb-no-review-reason'])
  },
  refusalNotice: {
    ...refusalNotice,
    summaryLabel: 'Show where the reason appears in the refusal notice'
  }
});
