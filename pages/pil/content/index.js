module.exports = {
  title: 'PIL Status',
  buttons: {
    continue: 'Continue'
  },
  fields: {
    status: {
      label: 'PIL Status'
    },
    procedures: {
      label: 'Procedures'
    }
  },
  procedureDefinitions: {
    A: `Minor / minimally invasive procedures not requiring sedation, analgesia or general anaesthesia.`,
    B: `Minor / minimally invasive procedures involving sedation, analgesia or brief general anaesthesia. Plus surgical
        procedures conducted under brief non-recovery general anaesthesia`,
    C: `Surgical procedures involving general anaesthesia. Plus - administration and maintenance of balanced or
        prolonged general anaesthesia.`,
    D: `Use of neuromuscular blocking agents`,
    F: 'Other'
  }
};
