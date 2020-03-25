const { Router } = require('express');
const { merge, set, get } = require('lodash');

const UnauthorisedError = require('@asl/service/errors/unauthorised');
const { populateNamedPeople } = require('../../../common/middleware');
const form = require('../../../common/routers/form');
const getSchema = require('../../schema/view');
const { cleanModel } = require('../../../../lib/utils');
const getContent = require('../content');
const { getNacwoById, getEstablishment } = require('../../../common/helpers');
const updateData = require('../middleware/update-data');

module.exports = () => {
  const app = Router({ mergeParams: true });

  // get relevant versionId if task is for a project.
  app.use((req, res, next) => {
    const model = get(req.task, 'data.model');

    if (model === 'project') {
      let url;
      const versionId = get(req.task, 'data.data.version');
      const project = get(req.task, 'data.modelData');

      req.projectId = get(req.task, 'data.id');
      req.establishmentId = project.establishmentId;

      if (versionId) {
        url = `/establishment/${req.establishmentId}/project/${req.projectId}/project-version/${versionId}`;
      } else {
        url = `/establishment/${req.establishmentId}/project/${req.projectId}/`;
      }

      return req.api(url, { query: { withDeleted: true } })
        .then(({ json: { data } }) => {
          req.project = data.project || data;
          req.version = data;
        })
        .then(() => next())
        .catch(next);
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = { id: req.task.id };

    next();
  });

  app.use((req, res, next) => {
    if (req.task.data.action === 'transfer' && req.task.data.model === 'project') {
      return next();
    }
    const establishmentId = get(req.task, 'data.model') === 'establishment'
      ? get(req.task, 'data.id')
      : get(req.task, 'data.establishmentId');
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

  app.use(populateNamedPeople);

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

  // if deleting model get vals, if updating model, get current values for diff,
  // if updating conditions get vals for context
  app.use((req, res, next) => {
    const action = req.task.data.action;
    const model = req.task.data.model;
    if (model === 'establishment') {
      res.locals.static.values = req.establishment;
      return next();
    }
    if (action === 'update' || action === 'delete' || action === 'update-conditions') {
      if (model === 'profile' && req.user.profile.id === req.task.data.id) {
        res.locals.static.values = req.user.profile;
        return next();
      }

      let est = '';
      if (model !== 'profile') {
        est = `/establishment/${req.task.data.data.establishmentId}`;

        if (model === 'pil') {
          est = `${est}/profile/${req.task.data.data.profileId}`;
        }
      }
      const id = req.task.data.id;
      const url = `/${model}/${id}`;

      return req.api(`${est}${url}`, { query: { withDeleted: true } })
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
      res.locals.static.version = req.version;
      console.log(res.locals.static.content['sticky-nav']);
      next();
    },
    process: (req, res, next) => {
      if (req.task.data.model === 'place' && req.body.restrictions === null) {
        set(req.session, `form[${req.model.id}].values.restrictions`, null);
      }
      next();
    }
  })));

  app.post('/', (req, res, next) => {
    const status = get(req.form, 'values.status');
    if (status === 'updated') {
      return updateData(req, res, next);
    }
    next();
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
