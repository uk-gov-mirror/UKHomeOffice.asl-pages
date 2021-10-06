const { Router } = require('express');
const { get, merge } = require('lodash');
const { BadRequestError } = require('@asl/service/errors');
const form = require('../../../common/routers/form');
const experienceFields = require('../schema/experience-fields');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../../common/middleware');
const { userCanEndorse } = require('../../../project-version/update/endorse/middleware');
const endorseContent = require('../content/endorse');

const sendData = (req, params = {}) => {
  const { values, meta } = get(req.session, `form.${req.model.id}`);
  const opts = {
    method: 'PUT',
    json: merge({
      data: values,
      meta
    }, params)
  };

  return req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/update-licence-holder`, opts);
};

module.exports = () => {
  const app = Router();

  app.use(userCanEndorse);

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
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
      const values = get(req.session, `form.${req.model.id}.values`);
      const licenceHolderId = values.licenceHolderId;
      res.locals.static.values = values;

      const collab = req.project.collaborators.find(collab => collab.id === licenceHolderId);
      res.locals.static.proposedLicenceHolder = collab || req.proposedLicenceHolder;
      res.locals.static.isDraft = req.project.draft && req.project.status === 'inactive';

      if (!req.canEndorse) {
        res.locals.static.type = 'amendment';
        // if user cannot endorse, the "submit" button from endorse should be used
        res.locals.static.content.buttons.submit = endorseContent.buttons.submit;
      }

      return next();
    }
  }));

  app.post('/', redirectToTaskIfOpen(req => {
    if (req.project.draft && req.project.status === 'inactive') {
      return false;
    }
    return true;
  }, {
    getSuffix: req => req.canEndorse ? 'endorse' : 'confirm'
  }));

  app.post('/', (req, res, next) => {
    if (req.project.draft && req.project.status === 'active') {
      return next(new BadRequestError('Cannot change licence holder while an amendment is in progress'));
    }

    if (req.project.draft && req.project.status === 'inactive') {
      return next();
    }

    if (req.canEndorse) {
      return res.redirect(req.buildRoute('project.updateLicenceHolder', { suffix: 'endorse' }));
    }

    return next();
  });

  app.post('/', (req, res, next) => {
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
