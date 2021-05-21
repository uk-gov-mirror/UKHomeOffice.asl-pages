const { Router } = require('express');
const { get, omit, merge } = require('lodash');
const { BadRequestError } = require('@asl/service/errors');
const form = require('../../../common/routers/form');
const experienceFields = require('../schema/experience-fields');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../../common/middleware');

const sendData = (req, params = {}) => {
  const values = get(req.session, `form.${req.model.id}.values`);
  const opts = {
    method: 'PUT',
    json: merge({
      data: {
        licenceHolderId: values.licenceHolderId
      },
      meta: omit(values, 'licenceHolderId', 'declaration')
    }, params)
  };

  return req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/update-licence-holder`, opts);
};

module.exports = () => {
  const app = Router();

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
    requiresDeclaration: req => !req.user.profile.asruUser,
    configure(req, res, next) {
      const versionId = req.project.status === 'inactive' ? req.project.draft.id : req.project.granted.id;
      return req.api(`/establishment/${req.establishmentId}/projects/${req.project.id}/project-versions/${versionId}`)
        .then(({ json: { data } }) => data)
        .then(version => {
          req.form.experienceFields = experienceFields(version, req.project.schemaVersion);
        })
        .then(() => next())
        .catch(next);
    },
    locals(req, res, next) {
      res.locals.static.fields = req.project.isLegacyStub ? [] : req.form.experienceFields.fields;
      res.locals.static.project = req.project;
      res.locals.static.values = get(req.session, `form.${req.model.id}.values`);
      req.api(`/establishment/${req.establishmentId}/profiles/${res.locals.static.values.licenceHolderId}`)
        .then(({ json: { data } }) => {
          res.locals.static.proposedLicenceHolder = data;
        })
        .then(() => next())
        .catch(next);
    }
  }));

  app.post('/', redirectToTaskIfOpen(req => {
    if (req.project.draft && req.project.status === 'inactive') {
      return false;
    }
  }));

  app.post('/', (req, res, next) => {
    if (req.project.draft && req.project.status === 'active') {
      return next(new BadRequestError('Cannot change licence holder while an amendment is in progress'));
    }
    sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];

        if (req.project.isLegacyStub || req.project.status === 'inactive') {
          req.notification({ key: 'success' });
          return res.redirect(req.buildRoute('project.read'));
        }

        return res.redirect(req.buildRoute('project.updateLicenceHolder', { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
