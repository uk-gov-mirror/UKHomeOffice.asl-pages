const { Router } = require('express');
const { castArray } = require('lodash');

const form = require('../../../common/routers/form');
const { buildModel, normalise } = require('../../../../lib/utils');
const { processSpecies } = require('../../helpers');
const { modules: schema } = require('../schema');
const { moduleCodes } = require('@asl/constants');

const { modulesThatRequireSpecies } = require('../../constants');

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    const exemptions = req.profile.exemptions;
    req.model = buildModel(schema);

    req.model = exemptions.reduce((obj, value, key) => {
      const module = value.module;
      const normalisedModule = normalise(module);
      return {
        ...obj,
        modules: [ ...obj.modules, module ],
        [`module-${normalisedModule}-reason`]: value.description,
        [`module-${normalisedModule}-species`]: value.species
      };
    }, req.model);

    next();
  });

  app.post('/', (req, res, next) => {
    next();
  });

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      req.form.values = {
        ...req.form.values,
        ...processSpecies(req)
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.modulesThatRequireSpecies = modulesThatRequireSpecies;
      Object.assign(
        res.locals.static.content.errors,
        {
          ...moduleCodes.reduce((obj, code) => {
            return {
              ...obj,
              [`module-${normalise(code)}-reason`]: {
                required: `${res.locals.static.content.errors.reason.required} ${code}`
              }
            };
          }, {})
        }
      );
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const ids = req.profile.exemptions.map(exemption => exemption.id);

    // TODO: refactor to allow addition of one exemption at a time.
    return Promise.all(
      ids.map(id => {
        const opts = {
          method: 'DELETE'
        };
        return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/exemption/${id}`, opts);
      })
    )
      .then(() => {
        return Promise.all(
          req.form.values.modules.map(module => {
            const normalisedModule = normalise(module);
            const species = req.form.values[`module-${normalisedModule}-species`];
            const opts = {
              method: 'POST',
              json: {
                data: {
                  module,
                  description: req.form.values[`module-${normalisedModule}-reason`],
                  species: species ? castArray(species).filter(s => s !== '') : null
                }
              }
            };
            return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/exemption`, opts);
          })
        );
      })
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
