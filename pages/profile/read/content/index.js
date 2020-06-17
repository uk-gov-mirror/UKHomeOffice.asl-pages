const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  profile: 'Profile',
  responsibilities: {
    title: 'Roles at this establishment',
    noRoles: 'None',
    roleApply: 'Add role',
    roleRemove: 'Remove role'
  },
  projects: {
    title: 'Active projects',
    licenceNumber: 'Licence number: {{licenceNumber}}',
    expiryDate: 'Expiry date: {{expiryDate}}',
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
    roleApply: 'Add role',
    pilView: 'View application',
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
      ownProfile: 'Please add your date of birth to your account.',
      otherProfile: 'Ask the applicant to add their date of birth to their account.'
    },
    under18: 'Personal licence holders must be over 18.',
    addDob: 'Please add your date of birth to your account.'
  }
});
