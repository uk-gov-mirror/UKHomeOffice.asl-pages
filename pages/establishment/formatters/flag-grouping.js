module.exports = {
  groupFlags: establishment => {
    establishment.licences = ['supplying', 'breeding', 'procedure'].filter(licence => establishment[licence]);
    return establishment;
  },

  ungroupFlags: establishment => {
    ['supplying', 'breeding', 'procedure'].map(licence => {
      establishment[licence] = establishment.licences.includes(licence);
    });
    return establishment;
  }
};
