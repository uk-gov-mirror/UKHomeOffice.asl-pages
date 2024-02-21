module.exports = {
  notifications: {
    'fee-waived-updated': 'Updated billable status'
  },
  fees: {
    title: 'Estimated licence fees',
    period: 'Covering the financial year:',
    disclaimer: 'These projections are based on the number of billable licences held and may differ from the final numbers.',
    details: {
      summary: 'How these fees are calculated',
      content: `Fees will be collected for any personal licences held at the establishment that were active for any period of time within the financial year.

Fees will also be collected for the establishment licence.

Fees are not collected for project licences.`
    },
    summary: {
      establishment: 'Establishment licence',
      personal: 'Personal licences',
      total: 'Total licences'
    },
    tabs: {
      overview: 'Licence fees overview',
      personal: 'Billable personal licences',
      allPersonal: 'All personal licences',
      details: 'Contact information for billing'
    }
  }
};
