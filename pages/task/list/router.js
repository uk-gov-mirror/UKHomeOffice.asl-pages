const { get } = require('lodash');
const defaultSchema = require('./schema');
const datatable = require('../../common/routers/datatable');

module.exports = ({ apiPath = '/me/tasks', schema = defaultSchema } = {}) => datatable({
  locals: (req, res, next) => {
    const firstName = get(req, 'user.profile.firstName');
    const lastName = get(req, 'user.profile.lastName');
    res.locals.static.profileName = `${firstName} ${lastName}`;
    next();
  }
})({ schema, apiPath });
