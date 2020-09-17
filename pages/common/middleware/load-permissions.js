const { every } = require('lodash');
/*
 * check a set of permission tasks based on the request params
 * and add any that match to `allowedActions`
 */

module.exports = (...perms) => (req, res, next) => {
  if (Array.isArray(perms[0])) {
    perms = perms[0];
  }

  // continue immediately if user has all permissions already
  if (every(perms, p => res.locals.static.allowedActions.includes(p))) {
    return next();
  }

  Promise.all(perms.map(p => req.user.can(p, req.params)))
    .then(result => {
      perms.forEach((p, i) => {
        if (result[i]) {
          res.locals.static.allowedActions.push(p);
        }
      });
    })
    .then(() => next())
    .catch(next);
};
