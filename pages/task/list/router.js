const { get, omit } = require('lodash');
const { NotFoundError } = require('@asl/service/errors');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

const hasMyTasks = profile => {
  return profile.asruUser && (profile.asruLicensing || profile.asruInspector);
};

const getTabs = profile => {
  const options = ['outstanding', 'inProgress', 'completed'];
  return hasMyTasks(profile) ? ['myTasks', ...options] : options;
};

module.exports = ({
  apiPath = '/tasks',
  schema = defaultSchema
} = {}) => datatable({
  configure: (req, res, next) => {
    if (!req.user.profile.asruUser) {
      req.datatable.schema = omit(req.datatable.schema, 'assignedTo');
    }
    const tabs = getTabs(req.user.profile);
    const progress = req.query.progress || tabs[0];
    if (!tabs.includes(progress)) {
      return next(new NotFoundError());
    }
    res.locals.static.tabs = tabs;
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
    res.locals.static.progress = req.datatable.progress;
    res.locals.datatable.progress = req.datatable.progress;

    if (req.datatable.progress === 'completed') {
      res.locals.static.content.fields.updatedAt.label = 'Completed';
    }

    next();
  }
})({ schema, apiPath });
