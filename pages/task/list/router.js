const { get } = require('lodash');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

module.exports = ({
  apiPath = '/tasks',
  schema = defaultSchema,
  tabs = ['outstanding', 'inProgress', 'completed']
} = {}) => datatable({
  getApiPath: (req, res, next) => {
    req.datatable.apiPath = [req.datatable.apiPath, { query: req.query }];
    next();
  },
  locals: (req, res, next) => {
    const firstName = get(req, 'user.profile.firstName');
    const lastName = get(req, 'user.profile.lastName');
    res.locals.static.profileName = `${firstName} ${lastName}`;
    res.locals.static.progress = req.query.progress;
    res.locals.static.tabs = tabs;
    next();
  }
})({ schema, apiPath });
