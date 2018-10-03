const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { pick } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const fields = ['certificate_number', 'accrediting_body', 'pass_date', 'modules'];
    const values = pick(req.session.form[req.model.id].values, fields);
    values.modules = values.modules.map(module => ({ module, species: [] }));

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/training`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/modules/, ''));
  });

  return app;
};
