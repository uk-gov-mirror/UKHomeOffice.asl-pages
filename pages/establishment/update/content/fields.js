module.exports = {
  name: {
    label: 'Establishment name'
  },
  address: {
    label: 'Address'
  },
  licences: {
    label: 'Licenced to carry out',
    options: {
      supplying: 'Supply of relevant protected animals',
      breeding: 'Breeding  of relevant protected animals',
      procedure: 'Regulated scientific procedures on regulated animals'
    }
  },
  authorisations: {
    label: 'Authorisations',
    options: {
      killing: 'Methods of killing not specified in Schedule 1',
      rehomes: 'Setting free and rehoming of protected animals after completion of a series of regulated procedures'
    }
  },
  comments: {
    label: 'Why are you making this change?'
  }
};
