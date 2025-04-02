module.exports = {
  nacwo: {
    title: 'NACWO mandatory training requirements',
    modules: {
      L: { content: ['1. Legislation'] },
      E1: { content: ['2. Ethics, animal welfare and the 3Rs (level 1)'] },
      'PILA (theory)': {
        tag: 'Species specific',
        content: [
          '3.1 Basic and appropriate biology',
          '4. Animal care, health and management',
          '5. Recognition of pain, suffering and distress',
          '7. Minimally invasive procedures without anaesthesia'
        ]
      },
      'PILA (skills)': {
        tag: 'Species specific',
        content: [
          '3.2 Basic and appropriate biology',
          '8. Minimally invasive procedures without anaesthesia'
        ]
      },
      'K (theory)': { content: ['6.1 Humane methods of killing (theory)'] },
      E2: { content: ['9. Ethics, animal welfare and the 3Rs (level 2)'] },
      NACWO: { content: ['23. Animals husbandry, care and enrichment Practices'] }
    },
    additional: {
      title: 'Mandatory training if working in areas where anaesthesia and surgery is carried out',
      modules: {
        PILB: { content: ['20. Anaesthesia for minor procedures'] },
        PILC: { content: ['21. Advanced anaesthesia eg. for surgery', '22. Principals of surgery'] }
      }
    }
  },
  nvs: {
  }
};
