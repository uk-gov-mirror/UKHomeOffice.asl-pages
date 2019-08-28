const { Router } = require('express');
const { uniq } = require('lodash');
const schema = require('../schema');
const form = require('../../../common/routers/form');
const { hydrate } = require('../../../common/middleware');

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

  app.use(form({
    schema: {
      ...schema,
      comments: {
        inputType: 'textarea',
        validate: ['required']
      }
    },
    getValues: (req, res, next) => {
      req.form.values.authorisationTypes = uniq(
        req.form.values.authorisations.map(authorisation => authorisation.type)
      );
      next();
    },
    process: (req, res, next) => {
      if (!Array.isArray(req.body.licences)) {
        req.form.values.licences = req.body.licences ? [req.body.licences] : [];
      }

      if (!Array.isArray(req.body.authorisationTypes)) {
        req.form.values.authorisationTypes = req.body.authorisationTypes ? [req.body.authorisationTypes] : [];
      }

      // if the checkbox for the auth type is unticked, remove those authorisations
      req.form.values.authorisations = fieldsToAuthorisations(req.body).filter(authorisation => {
        return req.form.values.authorisationTypes && req.form.values.authorisationTypes.includes(authorisation.type);
      });

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.buildRoute('establishment.update')}/confirm`);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
