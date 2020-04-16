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
    label: 'Date of birth',
    hint: `This information is collected to ensure you are over 18 years old, and therefore eligible to hold a licence.  However, your date of birth will not be visible to other users in your establishment.`
  },
  email: {
    label: 'Email',
    hint: 'They’ll use this to login, and get notifications such as updates on a licence application.'
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
    label: 'What permissions should this user have?',
    options: {
      basic: {
        label: 'Personal (Basic access)',
        hint: `* Manage own licences.
               * View named people and Home Office liaison contacts (HOLCs).`
      },
      read: {
        label: 'Overview (Intermediate access)',
        hint: `* Manage own licences.
               * View all people.
               * View all licences.
               * View the establishment’s approved areas.`
      },
      admin: {
        label: 'Admin (PEL holder delegate)',
        hint: `* Manage all licences.
               * Manage user accounts and permissions.
               * Manage establishment details, approved areas and named roles.
               * View annual licence fee information.
               * Endorse project applications on behalf of applicants.`
      },
      blocked: {
        label: 'Blocked',
        hint: `* Cannot view own licences.
               * Cannot view named people and Home Office liaison contacts (HOLCs).
               * Cannot view any other establishment details.`
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
