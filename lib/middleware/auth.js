const { get, some } = require('lodash');

module.exports = permissions => (task, params = {}) => (req, res, next) => {
  const settings = get(permissions, task);
  if (!settings) {
    const err = new Error('Unable to authenticate');
    err.status = 401;
    return next(err);
  }
  if (some(settings.roles, role => req.user.is(role))) {
    return next();
  }
  if (settings.canViewOwn === true &&
    params.establishment &&
    req.params[params.establishment] === req.user.get('establishment')) {
    return next();
  }
  const err = new Error('Not authorised');
  err.status = 403;
  return next(err);
};
