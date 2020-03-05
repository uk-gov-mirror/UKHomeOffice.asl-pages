const { merge, get } = require('lodash');
const { Router } = require('express');
const successContent = require('../content/success-messages');

function getUserType(req) {
  const profile = req.user.profile;

  if (!profile.asruUser) {
    return 'external';
  }

  if (profile.asruLicensing) {
    return 'licensing';
  }

  if (profile.asruInspector) {
    return 'inspector';
  }

  return 'internal';
}

module.exports = ({
  model = 'model',
  licence,
  type,
  status,
  refModel
} = {}) => {
  const app = Router();

  app.use((req, res, next) => {
    const user = getUserType(req);
    if (!status) {
      status = get(refModel || req.model, 'openTasks[0].status');
    }
    if (!licence || !status) {
      return next();
    }
    if (!type) {
      if (get(refModel || req.model, 'openTasks[0].data.action') === 'transfer') {
        type = 'transfer';
      } else if (get(refModel || req.model, 'status') === 'active') {
        type = 'amendment';
      } else {
        type = 'application';
      }
    }
    // try and lookup a user type specific content block
    const success = get(successContent, `${licence}.${type}.${status}.${user}`, get(successContent, `${licence}.${type}.${status}`));
    merge(res.locals.static.content, { success });
    res.locals.static.profile = res.locals.static.profile || req.user.profile;
    next();
  });

  app.get('/', (req, res, next) => {
    const id = (req.model && req.model.id) || `new-${model}`;
    if (req.session.form && req.session.form[id]) {
      delete req.session.form[id];
    }
    next();
  });

  return app;
};
