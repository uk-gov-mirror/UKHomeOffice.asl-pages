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
  telephoneAlt: {
    label: 'Alternative telephone number'
  },
  role: {
    label: 'What permissions should this user have?',
    options: {
      basic: {
        label: 'Personal (Basic access)',
        hint: `* manage own licences
* view named people and Home Office liaison contacts (HOLCs)`
      },
      read: {
        label: 'Overview (Intermediate access)',
        hint: `* manage own licences
* view all people
* view all licences
* view the establishment’s approved areas`
      },
      admin: {
        label: 'Admin (PEL holder delegate)',
        hint: `* manage all licences
* manage user accounts and permissions
* manage establishment details, approved areas and named roles
* view annual licence fee information
* endorse project applications on behalf of applicants`
      },
      blocked: {
        label: 'Blocked',
        hint: `* cannot view any licences
* cannot view named people and Home Office liaison contacts (HOLCs)
* cannot view any other establishment details`
      }
    }
  },
  name: {
    label: 'Name'
  },
  roles: {
    label: 'Roles'
  },
  pilLicenceNumber: {
    label: 'PIL number'
  },
  pilStatus: {
    label: 'PIL status'
  }
};
