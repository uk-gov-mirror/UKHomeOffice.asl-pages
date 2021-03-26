module.exports = {
  dashboard: {
    title: 'Establishment overview',
    establishment: {
      read: {
        subtitle: 'Contact information, conditions and authorisations.'
      },
      fees: {
        overview: {
          subtitle: 'All billable licences held at {{establishment.name}}.'
        }
      },
      rops: {
        subtitle: 'View and manage all returns of procedures at {{establishment.name}}'
      }
    },
    profile: {
      list: {
        subtitle: 'People affiliated with {{establishment.name}} including named people, licence holders and Home Office liaison contacts.'
      }
    },
    pils: {
      subtitle: 'Personal licences held at {{establishment.name}}{{#establishment.isTrainingEstablishment}} and applications for Category E licences{{/establishment.isTrainingEstablishment}}.'
    },
    place: {
      list: {
        subtitle: 'Approved areas where animals may be used.'
      }
    },
    project: {
      list: {
        subtitle: 'Projects held at {{establishment.name}} and those held elsewhere but licensed to work here.'
      }
    }
  },
  buttons: {
    establishment: {
      apply: 'Apply for an establishment licence'
    }
  },
  applicationInProgress: 'An application for this establishment licence has been sent to the Home Office.',
  cjsm: 'Secure CJSM email address'
};
