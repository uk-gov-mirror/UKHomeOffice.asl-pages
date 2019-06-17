module.exports = {
  groupFlags: establishment => {
    establishment.licences = [];
    ['supplying', 'breeding', 'procedure'].map(licence => {
      if (establishment[licence] === true) {
        establishment.licences.push(licence);
      }
    });

    establishment.authorisations = [];
    ['killing', 'rehomes'].map(authorisation => {
      if (establishment[authorisation] === true) {
        establishment.authorisations.push(authorisation);
      }
    });

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
