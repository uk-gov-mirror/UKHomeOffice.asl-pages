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
    },
    certificateNumber: {
      label: 'Certificate number'
    },
    accreditingBody: {
      label: 'Accreditation body'
    },
    passDate: {
      label: 'Date awarded'
    },
    notesCatD: {
      label: 'Evidence of competency'
    },
    notesCatF: {
      label: 'Type of regulated procedure'
    }
  },
  procedureDefinitions: {
    A: `Minor / minimally invasive procedures not requiring sedation, analgesia or general anaesthesia.`,
    B: `Minor / minimally invasive procedures involving sedation, analgesia or brief general anaesthesia. Plus surgical
procedures conducted under brief non-recovery general anaesthesia`,
    C: `Surgical procedures involving general anaesthesia. Plus - administration and maintenance of balanced or
prolonged general anaesthesia.`,
    D: `Use of neuromuscular blocking agents`,
    E: 'Education and training procedures conducted in accordance with Project Licence',
    F: 'Other'
  },
  action: {
    repeat: {
      add: 'Add another',
      remove: 'Remove'
    }
  },
  diff: {
    procedures: {
      current: 'Current categories',
      proposed: 'Proposed categories'
    },
    species: {
      current: 'Current animal types',
      proposed: 'Proposed animal types'
    }
  }
};
