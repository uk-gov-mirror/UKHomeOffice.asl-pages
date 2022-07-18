module.exports = {
  page: {
    title: {
      granted: 'Establishment licence',
      draft: 'Establishment details'
    }
  },
  address: 'Address',
  country: {
    label: 'Country',
    england: 'England',
    wales: 'Wales',
    scotland: 'Scotland',
    ni: 'Northern Ireland',
    unknown: 'Not specified'
  },
  licenced: {
    title: 'Licensed to carry out',
    procedure: 'Regulated procedures on protected animals',
    breeding: 'Breeding of relevant protected animals',
    supplying: 'Supply of relevant protected animals'
  },
  conditions: {
    title: 'Conditions',
    hasConditions: 'In addition to the [standard conditions of Section 2C licences](https://www.gov.uk/government/publications/establishment-licence-standard-conditions/establishment-licence-standard-conditions):',
    noConditions: 'The [standard conditions of Section 2C licences](https://www.gov.uk/government/publications/establishment-licence-standard-conditions/establishment-licence-standard-conditions) apply.'
  },
  trainingEst: 'This establishment runs training courses that require Category E personal licences',
  authorisations: {
    title: 'Authorisations',
    killing: {
      title: 'Methods of killing not mentioned in Schedule 1',
      method: 'Method',
      applicableAnimals: 'Applicable animals'
    },
    rehoming: {
      title: 'Setting free and re-homing of protected animals',
      circumstances: 'Circumstances',
      applicableAnimals: 'Applicable animals'
    }
  },
  approvedAreas: 'Approved areas',
  namedPeople: 'Named people',
  notifications: {
    'conditions-updated': 'The conditions on this licence have been updated.',
    'update-requested': 'Your update to conditions will be reviewed by a Licensing Officer.'
  },
  fields: {
    conditions: {
      label: ''
    }
  },
  action: {
    draftAmend: {
      summary: `## Amend establishment details
      Amend details about this establishment’s address, activities and authorisations.`,
      button: 'Amend establishment details'
    },
    amend: {
      summary: `## Amend licence
        You can amend this establishment licence if you want to:
        * Change any of the licence details
        * Add or remove authorisations
      `,
      button: 'Amend licence'
    },
    revoke: {
      summary: `## Revoke licence
        Cancel this licence if it is no longer needed.`,
      unavailable: `## Revoke licence
        You can't revoke this licence as there are still personal or project licences held at this establishment.

        The establishment will need to revoke them or transfer them to another establishment first.`,
      button: 'Revoke licence'
    },
    reapply: {
      summary: `## Reapply for licence
        You can amend this establishment licence if you want to:
        * Change any of the licence details
        * Add or remove authorisations
      `,
      button: 'Reapply for licence'
    },
    approvedAreas: 'View approved areas',
    namedPeople: 'View named people',
    backToDash: 'Go to establishment overview',
    download: {
      pdf: 'Download licence as a PDF'
    }
  },
  errors: {
    deadline: {
      validDate: 'Please provide a valid date',
      dateIsAfter: 'The deadline must be in the future'
    }
  }
};
