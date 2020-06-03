const { merge } = require('lodash');
const datatable = require('../routers/datatable');
const taskListSchema = require('../../task/list/schema');

module.exports = getQuery => {
  return datatable({
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
  })({ schema: taskListSchema, defaultRowCount: 5 });
};
