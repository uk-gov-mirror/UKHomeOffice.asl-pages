const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { omit } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const values = omit(req.session.form[req.model.id].values, 'exempt');
    values.profile_id = req.profile;
    values.modules = values.modules.map(module => ({ module, species: [] }));
    values.exemption = true;

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/me/training`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/exemptions\/modules/, ''));
  });

  return app;
};
