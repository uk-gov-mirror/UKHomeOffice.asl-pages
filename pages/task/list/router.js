const { get } = require('lodash');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

const hasMyTasks = profile => {
  return profile.asruUser && profile.asru && profile.asru.length > 0;
};

const tabs = profile => {
  const options = ['outstanding', 'inProgress', 'completed'];
  return hasMyTasks(profile) ? ['myTasks', ...options] : options;
};

module.exports = ({
  apiPath = '/tasks',
  schema = defaultSchema
} = {}) => datatable({
  getApiPath: (req, res, next) => {
    const progress = req.query.progress || tabs(req.user.profile)[0];
    req.datatable.progress = progress;
    req.datatable.apiPath = [req.datatable.apiPath, { query: { ...req.query, progress } }];
    next();
  },
  locals: (req, res, next) => {
    const firstName = get(req, 'user.profile.firstName');
    const lastName = get(req, 'user.profile.lastName');
    res.locals.static.profileName = `${firstName} ${lastName}`;
    res.locals.static.progress = req.datatable.progress;
    res.locals.datatable.progress = req.datatable.progress;

    res.locals.static.tabs = tabs(req.user.profile);
    next();
  }
})({ schema, apiPath });
