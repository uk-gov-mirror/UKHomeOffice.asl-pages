const { Router } = require('express');
const { merge, omit } = require('lodash');
const datatable = require('./datatable');
const content = require('../../task/list/content');
const taskListSchema = require('../../task/list/schema');

module.exports = getQuery => {
  const app = Router();

  const permsCheck = (user, query) => {
    let { model, modelId } = query;
    model = model === 'profile-touched' ? 'profile' : model;

    const params = {
      id: modelId,
      establishment: model === 'establishment' ? modelId : query.establishmentId
    };

    return user.can(`${model}.relatedTasks`, params);
  };

  app.use((req, res, next) => {
    const query = getQuery(req);

    return Promise.resolve()
      .then(() => permsCheck(req.user, query))
      .then(showRelatedTasks => {
        res.locals.static.showRelatedTasks = showRelatedTasks;
        if (!showRelatedTasks) {
          return next('router');
        }
        return next();
      })
      .catch(next);
  });

  app.use((req, res, next) => {
    if (!res.locals.static.showRelatedTasks) {
      return next('router');
    }
    next();
  });

  app.use(datatable({
    configure: (req, res, next) => {
      if (!req.user.profile.asruUser) {
        req.datatable.schema = omit(req.datatable.schema, ['activeDeadline', 'assignedTo']);
      }
      next();
    },
    getApiPath: (req, res, next) => {
      let query = getQuery(req);
      query = merge(query, req.query);
      req.datatable.apiPath = ['/tasks/related', { query }];
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.content = merge({}, content, res.locals.static.content);
      next();
    },
    errorHandler: (err, req, res, next) => {
      req.log('error', { ...err, message: err.message, stack: err.stack });
      res.locals.static.workflowConnectionError = true;
      next();
    }
  })({ schema: taskListSchema, defaultRowCount: 5 }));

  return app;
};
