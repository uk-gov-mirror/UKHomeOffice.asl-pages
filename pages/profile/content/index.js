module.exports = {
  fields: {
    firstName: {
      label: 'First name'
    },
    lastName: {
      label: 'Last name'
    },
    email: {
      label: 'Email address'
    },
    role: {
      label: 'What permission level should this user have?',
      options: {
        admin: {
          label: 'Full',
          hint: 'View, apply, and amend rights for all related licence information. Create and amend rights for all related user accounts. Manage other users\' permissions.'
        },
        read: {
          label: 'Intermediate',
          hint: 'View, apply, and amend rights for their own persional and project licences. View and amend rights for their own user account and profile. View only rights for all related licence information.'
        },
        basic: {
          label: 'Basic',
          hint: 'View and amend rights for their own profile. View only rights for other establishment, project, and personal licences by invitation.'
        }
      }
    },
    name: {
      label: 'Name'
    },
    roles: {
      label: 'Roles'
    },
    pil: {
      label: 'PIL number'
    }
  },
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
      match: 'This email address does not exist.'
    },
    role: {
      required: 'You need to set a permission level for this new user.'
    }
  },
  notifications: {
    success: 'Invitation sent to {{email}}.'
  }
};
