const { Router } = require('express');
const { omit } = require('lodash');
const schema = require('../schema');
const form = require('../../../common/routers/form');
const { hydrate, populateEstablishmentProfiles, populateNamedPeople } = require('../../../common/middleware');

function ungroupFlags(values) {
  const licenceOptions = ['supplying', 'breeding', 'procedure'];

  const flags = licenceOptions.reduce((obj, licence) => {
    return {
      ...obj,
      [licence]: (values.licences || []).includes(licence)
    };
  }, {});
  return {
    ...omit(values, 'licences'),
    ...flags
  };
}

const fieldsToAuthorisations = params => {
  return Object.keys(params).reduce((authorisations, fieldName) => {
    const matched = fieldName.match(/^authorisation-(killing|rehomes)-(method|description)-([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/);

    if (!matched || !params[fieldName]) {
      return authorisations;
    }

    const [, authType, authInfo, id] = matched;

    let authorisation = authorisations.find(a => a.id === id);

    if (!authorisation) {
      authorisation = { id };
      authorisations.push(authorisation);
    }

    authorisation.type = authType;

    if (authInfo === 'method') {
      authorisation.method = params[fieldName];
    }

    if (authInfo === 'description') {
      authorisation.description = params[fieldName];
    }

    return authorisations;
  }, []);
};

module.exports = () => {
  const app = Router();

  app.get('/', hydrate());

  app.use(populateNamedPeople, populateEstablishmentProfiles, form({
    configure: (req, res, next) => {
      const establishmentProfiles = req.establishment.profiles;
      req.form.schema = schema(establishmentProfiles);
      next();
    },
    getValues: (req, res, next) => {
      req.form.values.nprc = (req.form.values.nprc && req.form.values.nprc.id) || (req.establishment.nprc && req.establishment.nprc.id);
      req.form.values.pelh = (req.form.values.pelh && req.form.values.pelh.id) || (req.establishment.pelh && req.establishment.pelh.id);
      next();
    },
    process(req, res, next) {
      // if the checkbox for the auth type is unticked, remove those authorisations
      req.form.values.authorisations = fieldsToAuthorisations(req.body).filter(authorisation => {
        return req.form.values.authorisationTypes && req.form.values.authorisationTypes.includes(authorisation.type);
      });
      next();
    },
    saveValues(req, res, next) {
      req.session.form[req.model.id].values = ungroupFlags(req.session.form[req.model.id].values);
      // remove pseudoFields
      delete req.session.form[req.model.id].values.licences;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('establishment.update', { suffix: 'confirm' }));
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
