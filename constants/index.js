module.exports = {
  dateFormat: {
    short: 'D/M/Y',
    medium: 'DD MMMM YYYY'
  },
  procedureDefinitions: {
    A: `Minor / minimally invasive procedures not requiring sedation, analgesia or general anaesthesia.`,
    B: `Minor / minimally invasive procedures involving sedation, analgesia or brief general anaesthesia. Plus surgical
        procedures conducted under brief non-recovery general anaesthesia`,
    C: `Surgical procedures involving general anaesthesia. Plus - administration and maintenance of balanced or
        prolonged general anaesthesia.`,
    D: `Use of neromuscular blocking agents`,
    F: 'Other'
  },
  pilEndorsmentStatuses: {
    'ntco-endorsed': {
      label: 'Yes',
      hint: `I confirm that the applicant holds the neccessary training or experience to carry out the categories of procedures listed in this applciation`
    },
    'returned-to-applicant': {
      label: 'No',
      hint: ''
    }
  }
};
