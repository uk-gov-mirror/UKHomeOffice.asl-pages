module.exports = {
  title: 'Email alerts and newsletters',
  alerts: {
    sentTo: 'Emails sent to: **{{email}}**.',
    heading: 'Email alerts',
    ownLicences: `You receive email alerts for updates to licences held by you. You can’t turn off alerts about your own licences.`,
    otherLicences: {
      heading: 'Select licences you wish to be notified about',
      description: `As an admin you can also choose to be notified about other licences held at your establishment.`
    }
  },
  newsletters: {
    operational: {
      heading: 'Newsletters',
      holc: `As a Home Office Liaison Contact you are automatically subscribed to the
        [Animals in Science Regulation Unit's operational newsletter](https://www.gov.uk/government/publications/animals-in-science-regulation-unit-newsletters).`,
      notHolc: `You can choose to subscribe to the
        [Animals in Science Regulation Unit's operational newsletter](https://www.gov.uk/government/publications/animals-in-science-regulation-unit-newsletters).`
    }
  },
  fields: {
    newsletters: {
      label: ''
    }
  },
  errors: {
    newsletters: {
      definedValues: 'Please select an option'
    }
  },
  notifications: {
    success: 'Email preferences saved'
  },
  buttons: {
    submit: 'Update preferences'
  }
};
