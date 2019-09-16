const { Router } = require('express');
const { isUndefined, omit } = require('lodash');
const form = require('../../../common/routers/form');
const getSchema = require('../schema');
const experienceFields = require('../schema/experience-fields');
const { hydrate } = require('../../../common/middleware');

module.exports = () => {
  const app = Router();

  app.get('/', hydrate());

  app.use(form({
    configure(req, res, next) {
      req.api(`/establishment/${req.establishmentId}/profiles`, { query: { limit: 'all' } })
        .then(({ json: { data } }) => {
          req.form.schema = {
            ...getSchema(data),
            ...experienceFields.fieldNames.reduce((obj, field) => ({ ...obj, [field]: {} }), {})
          };
          if (req.project.granted) {
            req.form.schema.comments = {};
          }
        })
        .then(() => next())
        .catch(next);
    },
    process(req, res, next) {
      if (!isUndefined(req.form.values['experience-projects'])) {
        req.form.values['experience-projects'] = req.form.values['experience-projects'] === 'true';
      }
      next();
    },
    locals(req, res, next) {
      res.locals.static.schema = omit(req.form.schema, [ ...experienceFields.fieldNames, 'comments' ]);
      res.locals.static.fields = experienceFields.fields;
      res.locals.static.project = req.project;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(`${req.buildRoute('project.updateLicenceHolder')}/confirm`);
  });

  return app;
};
