const { Router } = require('express');
const { isUndefined, omit, uniqBy } = require('lodash');
const form = require('../../../common/routers/form');
const getSchema = require('../schema');
const experienceFields = require('../schema/experience-fields');
const { hydrate } = require('../../../common/middleware');

module.exports = (settings) => {
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
          const collabs = req.project.collaborators;
          const visibleProfiles = uniqBy([...profiles, ...collabs], profile => profile.id);
          req.form.schema = getSchema(visibleProfiles);
          req.form.experienceFields = experienceFields(version, req.project.schemaVersion);
          if (!req.project.isLegacyStub) {
            req.form.schema = {
              ...req.form.schema,
              ...req.form.experienceFields.fieldNames.reduce((obj, field) => ({ ...obj, [field]: {} }), {})
            };
          }

          if (req.project.granted && !req.project.isLegacyStub) {
            req.form.schema.comments = {
              meta: true
            };
          }
        })
        .then(() => next())
        .catch(next);
    },
    process(req, res, next) {
      // map boolean radio button options to actual booleans
      const fields = [
        'experience-projects',
        'training-has-delivered'
      ];
      fields.forEach(key => {
        if (!isUndefined(req.form.values[key])) {
          req.form.values[key] = req.form.values[key] === 'true';
        }
      });
      next();
    },
    locals(req, res, next) {
      res.locals.static.schema = omit(req.form.schema, [ ...req.form.experienceFields.fieldNames, 'comments' ]);
      res.locals.static.fields = req.project.isLegacyStub ? [] : req.form.experienceFields.fields;
      res.locals.static.project = req.project;
      next();
    },
    settings
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('project.updateLicenceHolder', { suffix: 'confirm' }));
  });

  return app;
};
