const { Router } = require('express');
const form = require('../../../common/routers/form');
const { modules: schema } = require('../schema');
const { pick, castArray, pickBy, startsWith } = require('lodash');
const { buildModel } = require('../../../../lib/utils');

const { modulesThatRequireSpecies } = require('../../constants');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    const modelId = `${req.profileId}-certificate`;
    req.model = Object.assign({}, req.session.form[modelId], buildModel(schema));
    req.model.id = modelId;
    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      ...schema.modules.options.reduce((obj, val) => {
        return {
          ...obj,
          [`module-${val.value}-species`]: val.species

        };
      }, {})
    },
    locals: (req, res, next) => {
      res.locals.static.schema = schema;
      res.locals.static.modulesThatRequireSpecies = modulesThatRequireSpecies;
      next();
    },
    process: (req, res, next) => {
      req.form.values.modules.map(m => {
        const specs = Object.values(pickBy(req.body, (value, key) => {
          return startsWith(key, `module-${m}-species`);
        })).filter(s => s !== '');
        req.form.values[`module-${m}-species`] = specs;
      });
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const fields = ['certificateNumber', 'accreditingBody', 'otherAccreditingBody', 'passDate', 'modules'];
    const values = pick(req.session.form[req.model.id].values, fields);

    values.modules = values.modules.map(module => {
      if (!modulesThatRequireSpecies.includes(module)) {
        return { module };
      }

      const species = req.form.values[`module-${module}-species`];

      if (!species) {
        throw new Error(`Please select at least one type of animal for module ${module}`);
      }

      return { module, species: castArray(species).filter(s => s !== '') };
    });

    const opts = {
      method: 'POST',
      json: {
        data: values
      }
    };

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/certificate`, opts)
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
