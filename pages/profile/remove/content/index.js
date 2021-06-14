module.exports = {
  self: {
    title: 'Confirm you want to leave this establishment',
    intro: 'You will no longer be able to access or apply for licences at {{ establishment.name }}.',
    drafts: {
      warning: 'You have licence applications that have not been submitted and will be deleted if you continue'
    },
    buttons: {
      submit: 'I understand, leave now',
      cancel: 'Cancel'
    },
    notifications: {
      removed: 'You\'ve left {{establishment.name}}.'
    }
  },
  otherUser: {
    title: 'Confirm removal of {{profile.firstName}} {{profile.lastName}} from this establishment',
    intro: 'They will no longer be able to view the establishment\'s details.',
    drafts: {
      warning: '{{profile.firstName}} {{profile.lastName}} has licence applications that have not been submitted and will be deleted if you continue'
    },
    buttons: {
      submit: 'I understand, remove now',
      cancel: 'Cancel'
    },
    notifications: {
      removed: 'Person removed'
    }
  }
};
