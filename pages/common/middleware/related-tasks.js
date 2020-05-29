const { merge } = require('lodash');
const datatable = require('../routers/datatable');
const taskListSchema = require('../../task/list/schema');

module.exports = (query) => datatable({
  getApiPath: (req, res, next) => {
    query = merge(query, req.query);
    req.datatable.apiPath = ['/tasks/related', { query }];
    next();
  },
  errorHandler: (err, req, res, next) => {
    req.log('error', { ...err, message: err.message, stack: err.stack });
    res.locals.static.workflowConnectionError = true;
    next();
  }
})({
  schema: taskListSchema,
  defaultRowCount: 5
});
