module.exports = {
  title: 'Email alerts',
  alerts: {
    sentTo: 'Emails sent to: **{{email}}**.',
    heading: {
      standard: 'Email alerts',
      admin: 'Your alerts'
    },
    ownLicences: `You receive automated emails about licences or applications held by you. You cannot turn these off.`,
    otherLicences: {
      heading: 'Other alerts',
      subheading: 'Select what you want to be notified about',
      description: `As an admin you can choose to be notified about other activity at your establishment.`
    }
  },
  notifications: {
    success: 'Email preferences saved'
  },
  buttons: {
    submit: 'Save preferences'
  }
};
