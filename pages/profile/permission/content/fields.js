module.exports = {
  permission: {
    label: '',
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
               * View details of the establishment, including named people and Schedule of Premises.
               * Request amendments to the licences they hold.`
      },
      admin: {
        label: 'Admin',
        hint: `* View and request amendments to all licences at the establishment.
               * Manage user accounts and permissions at the establishment.`
      }
    }
  }
};
