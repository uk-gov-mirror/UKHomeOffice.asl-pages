const { get, omit } = require('lodash');
const { NotFoundError } = require('@asl/service/errors');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

const getProgressOptions = profile => {
  const options = ['outstanding', 'inProgress', 'completed'];
  return profile.asruUser ? ['myTasks', ...options] : options;
};

module.exports = ({
  apiPath = '/tasks',
  schema = defaultSchema
} = {}) => datatable({
  configure: (req, res, next) => {
    if (!req.user.profile.asruUser) {
      req.datatable.schema = omit(req.datatable.schema, 'assignedTo');
    }
    const progressOptions = getProgressOptions(req.user.profile);
    const progress = get(req.query, 'filters.progress[0]') || get(req.query, 'progress') || progressOptions[0];

    if (!progressOptions.includes(progress)) {
      return next(new NotFoundError());
    }

    res.locals.static.progressOptions = progressOptions;
    req.datatable.progress = progress;
    req.datatable.sort = { column: 'updatedAt', ascending: false };
    if (req.user.profile.asruUser && ['myTasks', 'outstanding'].includes(progress)) {
      req.datatable.sort.ascending = true;
    }
    req.query.rows = req.query.rows || (req.user.profile.asruUser ? 20 : 10);
    next();
  },
  getApiPath: (req, res, next) => {
    const progress = req.datatable.progress;
    req.datatable.apiPath = [req.datatable.apiPath, { query: { ...req.query, progress } }];
    next();
  },
  errorHandler: (err, req, res, next) => {
    req.log('error', { ...err, message: err.message, stack: err.stack });
    res.locals.static.workflowConnectionError = true;
    next();
  },
  locals: (req, res, next) => {
    const firstName = get(req, 'user.profile.firstName');
    const lastName = get(req, 'user.profile.lastName');
    res.locals.static.profileName = `${firstName} ${lastName}`;
    res.locals.static.isAsruUser = req.user.profile.asruUser;
    res.locals.static.activeFilters = req.query.filters;
    res.locals.static.progress = req.datatable.progress;
    res.locals.datatable.progress = req.datatable.progress;

    if (req.datatable.progress === 'completed') {
      res.locals.static.content.fields.updatedAt.label = 'Completed';
    }

    next();
  }
})({ schema, apiPath });
