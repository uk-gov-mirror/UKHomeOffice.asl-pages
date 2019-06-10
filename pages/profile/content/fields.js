module.exports = {
  title: {
    label: 'Title'
  },
  firstName: {
    label: 'First name'
  },
  lastName: {
    label: 'Last name'
  },
  dob: {
    label: 'Date of birth'
  },
  email: {
    label: 'Email address'
  },
  address: {
    label: 'Address'
  },
  postcode: {
    label: 'Postcode'
  },
  telephone: {
    label: 'Telephone number'
  },
  role: {
    label: 'What permission level should this user have?',
    options: {
      basic: {
        label: 'Basic',
        hint: `* View details of all named people at the establishment.
               * View and request amendments to the licences they hold.
               * View details of projects they're working on.`
      },
      read: {
        label: 'Intermediate',
        hint: `* View details of all people and all licences at the establishment.
               * View details of the establishment, including named people and licensed premises.
               * Request amendments to the licences they hold.`
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
};
