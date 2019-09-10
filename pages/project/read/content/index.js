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
      description: 'An amendment to this licence was started on {{amendmentStartDate}}. You can either continue editing this amendment, or discard it.',
      action: 'Edit amendment',
      secondaryAction: 'Discard amendment'
    },
    submittedAmendment: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence has been submitted and is being reviewed. You can either view the details of this task, or recall the amendment.',
      action: 'View task',
      secondaryAction: 'Recall amendment'
    },
    submittedDraft: {
      title: 'Application in progress',
      description: 'This application has been submitted and is being reviewed. You can either view the details of this task, or recall the application.',
      action: 'View task',
      secondaryAction: 'Recall application'
    },
    discard: {
      action: 'Discard this amendment',
      confirm: `Are you sure you want to discard this amendment? Any changes you have made will be deleted.`
    }
  },
  discardDraft: {
    title: 'Discard draft project',
    description: 'Any information in this draft will be deleted if it is discarded.',
    action: 'Discard draft',
    confirm: 'Are you sure you want to discard this draft project?'
  },
  revoke: {
    title: 'Revoke licence',
    description: 'Cancel this licence if it is no longer needed.',
    action: 'Revoke licence'
  },
  revocation: {
    title: 'Revocation in progress',
    description: 'A request to revoke this licence has been submitted and is being reviewed.',
    action: 'View task'
  }
});
