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
  getStatus,
  getModel = req => req.model
} = {}) => {
  const app = Router();

  app.use((req, res, next) => {
    let typeOfChange = type;
    let statusChange = status;
    const typeOfLicence = licence;
    const refModel = getModel(req, res);
    const user = getUserType(req);
    if (typeof getStatus === 'function') {
      statusChange = getStatus(req, res);
    }
    if (!statusChange) {
      statusChange = get(refModel, 'openTasks[0].status');
    }
    if (!typeOfLicence || !statusChange) {
      return next();
    }
    if (!typeOfChange) {
      if (get(refModel, 'openTasks[0].data.action') === 'transfer') {
        typeOfChange = 'transfer';
      } else if (get(refModel, 'status') === 'active') {
        typeOfChange = 'amendment';
      } else {
        typeOfChange = 'application';
      }
    }
    // try and lookup a user type specific content block
    const success = get(successContent, `${typeOfLicence}.${typeOfChange}.${statusChange}.${user}`, get(successContent, `${typeOfLicence}.${typeOfChange}.${statusChange}`));
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

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
