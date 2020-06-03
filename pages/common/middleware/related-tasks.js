const { Router } = require('express');
const { merge } = require('lodash');
const datatable = require('../routers/datatable');
const taskListSchema = require('../../task/list/schema');

module.exports = getQuery => {
  const app = Router();

  app.use((req, res, next) => {
    if (!res.locals.static.showRelatedTasks) {
      return next('router');
    }
    next();
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      let query = getQuery(req);
      query = merge(query, req.query);
      req.datatable.apiPath = ['/tasks/related', { query }];
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
