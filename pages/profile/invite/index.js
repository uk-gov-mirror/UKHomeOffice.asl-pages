const page = require('../../../lib/page');
const form = require('../../common/routers/form');
// const confirm = require('../../common/routers/confirm');
const success = require('../../common/routers/success');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };
    return req.api(`/establishment/${req.establishment}/profile`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = (req.model && req.model.id) || `new-${model}`;
    if (req.session.form && req.session.form[id]) {
      delete req.session.form[id];
    }
    next();
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/invite/, ''));
  });

  return app;
};
