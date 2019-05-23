const { Router } = require('express');
const { merge, set, unset, get } = require('lodash');

const UnauthorisedError = require('@asl/service/errors/unauthorised');
const form = require('../../../common/routers/form');
const getSchema = require('../../schema/view');
const { cleanModel } = require('../../../../lib/utils');
const getContent = require('../content');
const { getNacwoById, getEstablishment } = require('../../../common/helpers');

const getRelevantActivity = activityLog => activityLog.filter(log => {
  if (get(log, 'event.meta.payload.data.extended')) {
    log.eventName = 'status:deadline-extension';
    return true;
  }

  if (!log.eventName.includes('status:')) {
    return false;
  }

  if (log.eventName.includes('status:with-ntco')) {
    return false;
  }

  return true;
});

module.exports = () => {
  const app = Router({ mergeParams: true });

  // get relevant versionId if task is for a project.
  app.use((req, res, next) => {
    const model = get(req.task, 'data.model');

    if (model === 'project') {
      req.projectId = get(req.task, 'data.id');
      req.establishmentId = get(req.task, 'data.data.establishmentId');
      return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}`)
        .then(({ json: { data } }) => {
          req.project = data;
        })
        .then(() => next())
        .catch(next);
    }
    next();
  });

  app.use((req, res, next) => {
    req.breadcrumb('task.read');
  });

  app.use((req, res, next) =>
    const action = get(req, 'query.action');
    if (action === 'withdraw') {
      set(req, `session.form[${req.task.id}].values`, { status: 'withdrawn-by-applicant' });
      return res.redirect(req.buildRoute('task.confirm', req.params));
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = { id: req.task.id };

    if (req.task.activityLog) {
      req.task.activityLog = getRelevantActivity(req.task.activityLog);
    }

    next();
  });

  app.use((req, res, next) => {
    const establishmentId = get(req.task, 'data.data.establishmentId');
    if (establishmentId) {
      return getEstablishment(req, establishmentId)
        .then(establishment => {
          req.establishmentId = establishment.id;
          req.establishment = establishment;
        })
        .then(() => next())
        .catch(next);
    }
    next();
  });

  // get nacwo profile if place model
  app.use((req, res, next) => {
    if (req.task.data.model === 'place') {
      return getNacwoById(req, req.task.data.data.nacwo)
        .then(nacwo => {
          set(req.task, 'data.data.nacwo', nacwo);
        })
        .then(() => next())
        .catch(next);
    }
    next();
  });

  app.use((req, res, next) => {
    const profileId = get(req.task, 'data.data.profileId');
    const establishmentId = get(req.task, 'data.data.establishmentId');
    if (profileId && establishmentId) {
      return req.api(`/establishment/${establishmentId}/profile/${profileId}`)
        .then(({ json: { data } }) => {
          req.profile = cleanModel(data);
        })
        .then(() => next())
        .catch(error => {
          return Promise.resolve()
            .then(() => req.user.can('profile.read.all', { establishment: establishmentId }))
            .then(canReadAllProfiles => {
              if (!canReadAllProfiles) {
                const content = getContent(req.task);
                next(new UnauthorisedError(content.errors.permissions));
              } else {
                next(error);
              }
            });
        });
    }
    next();
  });

  // if deleting model get vals, if updating model, get current values for diff
  app.use((req, res, next) => {
    if (req.task.data.action === 'update' || req.task.data.action === 'delete') {
      const model = req.task.data.model;
      if (model === 'profile' && req.user.profile.id === req.task.data.id) {
        res.locals.static.values = req.user.profile;
        return next();
      }

      let est = '';
      if (model !== 'profile') {
        est = `/establishment/${req.task.data.data.establishmentId}`;
      }
      const id = req.task.data.id;
      const url = `/${model}/${id}`;

      return req.api(`${est}${url}`)
        .then(({ json: { data } }) => {
          res.locals.static.values = data;
        })
        .then(() => next())
        .catch(next);
    }

    next();
  });

  app.use(form(Object.assign({
    configure: (req, res, next) => {
      res.locals.static.content = merge({}, res.locals.static.content, getContent(req.task));
      req.schema = getSchema(req.task);
      req.form.schema = req.schema;

      if (req.task.data.model === 'place') {
        req.form.schema = {
          ...req.form.schema,
          restrictions: {}
        };
      }

      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = req.schema;
      res.locals.static.task = req.task;
      res.locals.static.profile = req.profile;
      res.locals.static.isAsru = req.user.profile.asruUser;
      res.locals.static.isInspector = req.user.profile.asruUser && req.user.profile.asruInspector;
      res.locals.static.establishment = req.establishment;
      res.locals.static.project = req.project;
      next();
    },
    process: (req, res, next) => {
      if (req.task.data.model === 'place' && !req.body.restrictions) {
        unset(req.session, `form[${req.model.id}].values.restrictions`);
      }
      next();
    }
  })));

  app.post('/', (req, res, next) => {
    const model = get(req.task, 'data.model');
    const status = get(req.form, 'values.status');
    if (model === 'project' && status === 'resubmitted') {
      return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
        .then(({ json: { data } }) => {
          req.versionId = data.data.id;
          res.redirect(req.buildRoute('project.version.update'));
        })
        .catch(next);
    }
    next();
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.confirm', { taskId: req.task.id }));
  });

  return app;
};
