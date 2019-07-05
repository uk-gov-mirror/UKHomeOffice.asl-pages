const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  amendment: {
    create: {
      title: 'Amend granted licence',
      description: 'Start an amendment for this project licence.',
      action: 'Amend licence'
    },
    continue: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence was started on {{amendmentStartDate}}. You can either continue with this amendment, or discard it.',
      action: 'Continue editing amendment',
      secondaryAction: 'Discard this amendment'
    },
    submitted: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence has been submitted and is being reviewed. You can view the details of this task or withdraw the amendment.',
      action: 'View task',
      secondaryAction: 'Recall amendment'
    }
  }
});
