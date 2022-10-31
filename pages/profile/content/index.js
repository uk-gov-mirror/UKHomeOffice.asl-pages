module.exports = {
  invite: 'Invite user',
  fields: require('./fields'),
  buttons: {
    submit: 'Send invitation'
  },
  errors: {
    firstName: {
      required: 'You need to enter a first name.'
    },
    lastName: {
      required: 'You need to enter a last name.'
    },
    email: {
      required: 'You need to enter an email address for this person.',
      email: 'You need to enter an email address for this person.'
    },
    role: {
      required: 'You need to set a permission level for this new user.'
    },
    dob: {
      validDate: 'You need to enter a valid date'
    }
  },
  notifications: {
    'invitation-sent': 'Invitation sent to {{email}}.'
  },
  adminWarning: 'Admins will get notifications every time there’s a request for a new or amended licence, or when a decision has been made.',
  tabs: {
    active: 'Active',
    invited: 'Invited'
  }
};
