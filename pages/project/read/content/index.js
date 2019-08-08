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
    submittedAmendment: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence has been submitted and is being reviewed. You can view the details of this task or withdraw the amendment.',
      action: 'View task',
      secondaryAction: 'Withdraw amendment'
    },
    submittedDraft: {
      title: 'Application in progress',
      description: 'This application has been submitted and is being reviewed. You can view the details of this task or withdraw the application.',
      action: 'View task',
      secondaryAction: 'Withdraw application'
    },
    discard: {
      action: 'Discard this amendment',
      confirm: `Are you sure you want to discard this amendment? Any changes made in this amendment will be deleted.`
    }
  },
  discardDraft: {
    title: 'Discard draft project',
    description: 'Any information in this draft will be deleted if it is discarded.',
    action: 'Discard draft',
    confirm: 'Are you sure you want to discard this draft project?'
  }
});
