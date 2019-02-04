const { Router } = require('express');
const { merge, set, unset } = require('lodash');

const UnauthorisedError = require('@asl/service/errors/unauthorised');
const form = require('../../../common/routers/form');
const schemaGenerator = require('../../schema');
const { cleanModel } = require('../../../../lib/utils');
const getContent = require('../content');

const { getNacwoById } = require('../../../common/helpers');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('task.base');
    req.model = { id: `${req.task.id}-decision` };
    next();
  });

  app.use((req, res, next) => {
    if (req.task.data.data.establishmentId) {
      return req.api(`/establishment/${req.task.data.data.establishmentId}`)
        .then(({ json: { data } }) => {
          req.establishmentId = data.id;
          req.establishment = data;
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
    if (req.task.data.data.profileId && req.task.data.data.establishmentId) {
      return req.api(`/establishment/${req.task.data.data.establishmentId}/profile/${req.task.data.data.profileId}`)
        .then(({ json: { data } }) => {
          req.profile = cleanModel(data);
        })
        .then(() => next())
        .catch(error => {
          return Promise.resolve()
            .then(() => req.user.can('profile.read.all', { establishment: req.task.data.data.establishmentId }))
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
      const establishment = req.task.data.data.establishmentId;
      const id = req.task.data.id;
      const url = `/establishment/${establishment}/${model}/${id}`;

      return req.api(url)
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
      req.schema = schemaGenerator(req.task);
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
      res.locals.static.establishment = req.establishment;
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
    return res.redirect(req.buildRoute('task.confirm', { taskId: req.task.id }));
  });

  return app;
};
