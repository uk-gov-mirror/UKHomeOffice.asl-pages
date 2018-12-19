const { Router } = require('express');
const form = require('../../../common/routers/form');
const { modules: schema } = require('../schema');
const { moduleCodes } = require('@asl/constants');

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    const exemptions = req.profile.exemptions;

    req.model = {
      modules: []
    };

    req.model = exemptions.reduce((obj, value, key) => {
      const module = value.module;
      return {
        ...obj,
        modules: [ ...obj.modules, module ],
        [`module-${module}-reason`]: value.exemptionDescription
      };
    }, req.model);

    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      ...schema.modules.options.reduce((obj, val) => {
        return {
          ...obj,
          [`module-${val.value}-reason`]: val.reveal.reason
        };
      }, {})
    },
    locals: (req, res, next) => {
      res.locals.static.schema = schema;
      Object.assign(
        res.locals.static.content.errors,
        {
          ...moduleCodes.reduce((obj, code) => {
            return {
              ...obj,
              [`module-${code}-reason`]: {
                customValidate: `${res.locals.static.content.errors.reason.customValidate} ${code}`
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
            const opts = {
              method: 'POST',
              json: {
                data: {
                  module,
                  description: req.form.values[`module-${module}-reason`]
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
