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
        basic: {
          label: 'Basic',
          hint: `* View and request amendments to the licences they hold.
                 * View details of the establishment, including the named people and Schedule of Premises.
                 * View details of projects they're working on.`
        },
        read: {
          label: 'Intermediate',
          hint: `* View details of all people and all licences at the establishment.
                 * Request amendments to the licences they hold.
        },
        admin: {
          label: 'Admin',
          hint: `* View and request amendments to all licences at the establishment.
                 * Manage user accounts and permissions at the establishment.`
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
