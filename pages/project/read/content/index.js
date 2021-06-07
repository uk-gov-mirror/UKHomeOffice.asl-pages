const { merge } = require('lodash');
const baseContent = require('../../content');
const downloadContent = require('../../../project-version/downloads/content');
const collaborators = require('../../collaborators/content');

module.exports = merge({}, baseContent, {
  page: {
    title: {
      granted: 'Project',
      application: 'Application overview'
    }
  },
  tabs: {
    granted: {
      overview: 'Project overview',
      manage: 'Manage licence',
      'manage-access': 'Guest access',
      history: 'History',
      reporting: 'Reporting',
      downloads: 'Downloads'
    },
    application: {
      overview: 'Details',
      manage: 'Manage application',
      history: 'History',
      downloads: 'Downloads'
    }
  },
  details: {
    granted: {
      title: 'Licence details',
      licenceHolder: 'Licence holder',
      subsectionTitle: 'Licence'
    },
    application: {
      title: 'Application details',
      licenceHolder: 'Prospective licence holder',
      subsectionTitle: 'Application'
    }
  },
  fields: {
    establishment: {
      label: 'Primary establishment'
    }
  },
  downloads: {
    ...downloadContent,
    title: {
      active: 'Project downloads',
      inactive: 'Application downloads'
    }
  },
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
      transfer: `You can amend this project licence if you want to:

      * Change any of the licence details
      * Transfer to another establishment`,
      establishmentCannotContinue: `The Home Office has initiated an amendment to this project licence so you're unable to make any changes until that has been processed.

      Contact your establishments Single Point of Contact for more information.`
    }
  },
  currentActivity: {
    amendmentStarted: {
      title: 'Amendment in progress'
    },
    nothingInProgress: 'Nothing in progress just now.'
  },
  amendStub: {
    title: 'Continue adding details',
    description: 'Continue filling in the licence details. Changes will only be visible to the ASRU licensing team until the licence has been fully converted.'
  },
  actions: {
    view: {
      granted: {
        licence: 'View licence',
        pdf: 'Download licence (PDF)',
        'additional-availability-removed': 'View last available version of this licence',
        'additional-availability-removed-pdf': 'Download last available version of this licence (PDF)'
      },
      application: {
        draft: 'Open application',
        pdf: 'Download application (PDF)',
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
      draft: 'Discard application',
      amendment: 'Discard this amendment',
      stub: 'Cancel licence conversion'
    },
    amendStub: 'Edit record',
    cantChangeHolder: 'An amendment is in progress so the PPL holder cannot be changed'
  },
  confirm: {
    application: 'Are you sure you want to discard this draft project?',
    amendment: 'Are you sure you want to discard this amendment? Any changes you have made will be deleted.',
    stub: 'Are you sure you want to discard this partial project record? Any changes you have made will be deleted.'
  },
  discard: {
    draft: {
      title: 'Discard application',
      description: 'Information in this application will be deleted.'
    },
    stub: {
      title: 'Cancel conversion',
      description: 'Any information that has been added to the partial record for this licence will be deleted.'
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
  },
  manageAccess: {
    title: 'Guest access',
    content: {
      application: 'Give people read-only or editing permissions for this application. Establishment administrators will have access by default.',
      granted: 'Give people read-only or editing permissions for this project. Establishment administrators will have access by default.'
    },
    action: 'Grant access'
  },
  otherDocuments: {
    heading: 'Other documents',
    links: {
      nts: 'Non-technical summary',
      ra: 'Non-technical summary and retrospective assessment'
    }
  },
  manage: {
    noPermissions: 'You don\'t have permission to amend, revoke or grant other users access to this licence.'
  },
  ra: {
    title: 'Retrospective assessment',
    description: '**Deadline for submission: {{date}}**',
    grantedDescription: '**RA completed: {{date}}**',
    create: 'Start assessment',
    granted: 'View completed assessment',
    draft: 'View draft assessment',
    openTask: 'View task'
  },
  changeLicenceHolder: {
    title: 'Change licence holder',
    description: 'Change the prospective licence holder of this project.',
    link: 'Change licence holder'
  },
  warnings: {
    raRequired: `**A retrospective assessment of this project's outcomes is due by {{date}}**`,
    link: 'Fill in assessment',
    aa: 'Some features only available to the primary establishment have been hidden.'
  },
  rops: {
    title: 'Return of procedures',
    content: 'Complete this project’s return of procedures for {{year}}.',
    submitted: 'A return of procedures has been submitted for {{year}}.',
    deadline: '**Deadline for submission:** {{deadline}}',
    start: 'Start return',
    continue: 'Continue editing return',
    read: 'View submitted return',
    'not-due': 'Return of procedures are no longer due for this project'
  },
  ...collaborators
});
