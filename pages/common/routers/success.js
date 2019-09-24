const { merge, get } = require('lodash');
const { Router } = require('express');
const successContent = require('../content/success-messages');

module.exports = ({
  model = 'model',
  licence,
  type,
  status
} = {}) => {
  const app = Router();

  app.use((req, res, next) => {
    if (!licence || !status) {
      return next();
    }
    if (!type && req.model && req.model.status) {
      type = req.model.status === 'active' ? 'amendment' : 'application';
    }
    const success = get(successContent, `${licence}.${type}.${status}`);
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
