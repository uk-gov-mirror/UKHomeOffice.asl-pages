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
    const values = req.session.form[req.model.id].values;
    values.profile_id = req.profile;

    const requests = values.modules.map(module => {
      const data = { ...omit(values, 'modules'), module };

      const opts = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      };

      return req.api(`/pil/training`, opts);
    });

    Promise.all(requests)
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