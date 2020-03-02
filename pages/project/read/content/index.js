const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  openTask: {
    application: {
      title: 'Application in progress',
      description: 'This application has been submitted and is being reviewed. You can either view the details of this task, or recall the application.'
    },
    amendment: {
      title: 'Amendment in progress',
      description: 'An amendment to this licence has been submitted and is being reviewed. You can either view the details of this task, or recall the amendment.'
    },
    revocation: {
      title: 'Revocation in progress',
      description: 'A request to revoke this licence has been submitted and is being reviewed.'
    },
    'update-licence-holder': {
      title: 'Amendment in progress',
      // TODO: Devs do content
      description: 'A request to change the licence holder is currently in progress, you can view the task to see a list of available steps.'
    },
    'returned-draft': {
      title: 'Application in progress',
      // TODO: Devs do content
      description: 'There is an application in progress, you can continue authoring the application above or view the task to see a list of available steps.'
    },
    'cannot-update': {
      title: '{{status}} in progress',
      description: 'There is an open task for this {{status}}.'
    }
  },
  'start-amendment': {
    title: {
      start: 'Amend granted licence',
      continue: 'Amendment in progress'
    },
    description: {
      start: 'Start an amendment for this project licence.',
      continue: 'An amendment to this licence was started on {{amendmentStartDate}}. You can either continue editing this amendment, or discard it.',
      asruCannotContinue: 'This licence cannot be amended because the establishment has initiated an amendment to this project which hasn\'t yet been submitted.',
      establishmentCannotContinue: `The Home Office has initiated an amendment to this project licence so you're unable to make any changes until that has been processed.

      Contact your establishments Single Point of Contact for more information.`
    }
  },
  amendStub: {
    title: 'Continue adding details',
    description: 'Add further details to this stub record of a project licence. Once all details have been added, you can convert it to a full licence.'
  },
  actions: {
    view: {
      granted: {
        active: 'View granted licence',
        revoked: 'View revoked licence',
        expired: 'View expired licence',
        stub: 'Open stub',
        transferred: 'View transferred licence'
      },
      draft: {
        draft: 'Open draft',
        submitted: 'View submitted draft',
        returned: 'Continue editing draft'
      }
    },
    viewTask: 'View task',
    continue: 'Edit amendment',
    amend: 'Amend licence',
    revoke: 'Revoke licence',
    discardTask: 'View task to discard',
    discard: {
      draft: 'Discard draft',
      amendment: 'Discard this amendment',
      stub: 'Discard stub'
    },
    amendStub: 'Continue adding details'
  },
  confirm: {
    application: 'Are you sure you want to discard this draft project?',
    amendment: 'Are you sure you want to discard this amendment? Any changes you have made will be deleted.',
    stub: 'Are you sure you want to discard this project stub? Any changes you have made will be deleted.'
  },
  discard: {
    draft: {
      title: 'Discard draft project',
      description: 'Any information in this draft will be deleted if it is discarded.'
    },
    stub: {
      title: 'Discard stub project',
      description: 'Any information in this stub will be deleted if it is discarded.'
    }
  },
  previousVersions: {
    title: 'Previous versions of this licence',
    description: 'View previous versions of the licence and their full applications.',
    version: 'View the {{type}} granted on {{updatedAt}}.'
  },
  revoke: {
    title: 'Revoke licence',
    description: 'Cancel this licence if it is no longer needed.'
  }
});
