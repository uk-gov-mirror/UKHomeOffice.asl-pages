module.exports = {
  site: {
    show: true,
    filter: true
  },
  area: {
    show: true
  },
  name: {
    show: true
  },
  suitability: {
    show: true,
    filter: true,
    comparator: 'AND',
    exact: true,
    sortable: false,
    toCSVString: suitability => suitability && suitability.length ? suitability.join(', ') : ''
  },
  holding: {
    show: true,
    filter: true,
    comparator: 'AND',
    exact: true,
    sortable: false,
    toCSVString: holding => holding && holding.length ? holding.join(', ') : ''
  },
  nacwos: {
    show: true,
    sortable: false,
    filter: true,
    toCSVString: profile => profile && profile.length ? profile.map(p => `${p.firstName} ${p.lastName}`).join(', ') : ''
  },
  nvssqps: {
    show: true,
    sortable: false,
    filter: true,
    title: 'nvs / sqps',
    toCSVString: profile => profile && profile.length ? profile.map(p => `${p.firstName} ${p.lastName}`).join(', ') : ''
  },
  restrictions: {
    show: false
  }
};
