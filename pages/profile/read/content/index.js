const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  profile: 'Profile',
  responsibilities: {
    title: 'Roles at this establishment',
    noRoles: 'None',
    roleApply: 'Add role',
    roleRemove: 'Remove role',
    rcvsNumber: 'RCVS membership number: {{rcvsNumber}}'
  },
  training: 'Training record',
  projects: {
    title: 'Active projects',
    licenceNumber: 'Licence number: {{licenceNumber}}',
    expiryDate: 'Expires on {{expiryDate}}',
    primaryAvailabilityAt: {
      application: 'Application at {{establishmentName}}',
      licence: 'Licence held at {{establishmentName}}'
    },
    additionalAvailabilityAt: 'Has additional availabilty at {{establishmentNames}}',
    noProjects: 'None',
    drafts: 'Draft projects',
    conversions: 'Project conversions'
  },
  contactDetails: {
    title: 'Contact details',
    professionalAddress: 'Professional address',
    telephone: 'Phone:',
    telephoneAlt: 'Alternative phone:',
    email: 'Email address:'
  },
  permissionLevel: {
    title: 'Permission level'
  },
  buttons: {
    continue: 'Continue',
    pplApply: 'Apply for project licence',
    pilApply: 'Apply for personal licence',
    pilView: 'View application',
    pilReapply: 'Reapply for personal licence',
    roleApply: 'Add role',
    convertExisting: 'Convert existing project'
  },
  pil: {
    title: 'Personal licence',
    noPil: 'None',
    incompletePil: 'Application started.',
    incompleteOtherEst: 'Application started at another establishment.',
    user: {
      incomplete: 'Application started.',
      notStarted: 'None'
    },
    other: {
      incomplete: 'Application started.',
      notStarted: 'None'
    },
    noDob: {
      otherProfile: 'Ask the applicant to add their date of birth to their account.'
    },
    under18: 'Personal licence holders must be over 18.',
    addDob: 'Please add your date of birth to your account.'
  },
  leaveEstablishment: {
    title: 'Leave this establishment',
    content: 'You will no longer be able to access or apply for licences at {{establishment.name}}.',
    'cannot-leave': 'Before you can leave {{establishment.name}}, you need to discard or transfer any licences you hold, and remove yourself from any named roles.',
    button: 'Leave establishment'
  },
  notifications: {
    leftEstablishment: 'You\'ve left {{establishment.name}}.'
  }
});
