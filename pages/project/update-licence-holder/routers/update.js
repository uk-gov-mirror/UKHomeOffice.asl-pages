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
      const versionId = req.project.status === 'inactive' ? req.project.draft.id : req.project.granted.id;
      const getProfiles = () => {
        return req.api(`/establishment/${req.establishmentId}/profiles`, { query: { limit: 'all' } })
          .then(({ json: { data } }) => data);
      };
      const getProjectVersion = () => {
        return req.api(`/establishment/${req.establishmentId}/projects/${req.project.id}/project-versions/${versionId}`)
          .then(({ json: { data } }) => data);
      };
      req.model.licenceHolderId = '';
      Promise.all([getProfiles(), getProjectVersion()])
        .then(([profiles, version]) => {
          req.form.schema = getSchema(profiles);
          req.form.experienceFields = experienceFields(version, req.project.schemaVersion);
          if (!req.project.isLegacyStub) {
            req.form.schema = {
              ...req.form.schema,
              ...req.form.experienceFields.fieldNames.reduce((obj, field) => ({ ...obj, [field]: {} }), {})
            };
          }

          if (req.project.granted && !req.project.isLegacyStub) {
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
      res.locals.static.schema = omit(req.form.schema, [ ...req.form.experienceFields.fieldNames, 'comments' ]);
      res.locals.static.fields = req.project.isLegacyStub ? [] : req.form.experienceFields.fields;
      res.locals.static.project = req.project;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('project.updateLicenceHolder', { suffix: 'confirm' }));
  });

  return app;
};
