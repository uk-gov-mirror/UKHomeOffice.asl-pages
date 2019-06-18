module.exports = {
  groupFlags: establishment => {
    establishment.licences = ['supplying', 'breeding', 'procedure'].filter(licence => establishment[licence]);
    establishment.authorisations = ['killing', 'rehomes'].filter(authorisation => establishment[authorisation]);

    return establishment;
  },

  ungroupFlags: establishment => {
    ['supplying', 'breeding', 'procedure'].map(licence => {
      establishment[licence] = establishment.licences.includes(licence);
    });

    ['killing', 'rehomes'].map(authorisation => {
      establishment[authorisation] = establishment.authorisations.includes(authorisation);
    });

    return establishment;
  }
};
