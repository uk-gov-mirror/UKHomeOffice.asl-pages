const { get } = require('lodash');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

module.exports = ({ apiPath = '/me/tasks', schema = defaultSchema } = {}) => datatable({
  locals: (req, res, next) => {
    res.locals.static.profileName = get(req, 'user.profile.name');
    console.log(get(req, 'user.profile.name'));
    console.log(req.user.profile)
    next();
  }
})({ schema, apiPath });
