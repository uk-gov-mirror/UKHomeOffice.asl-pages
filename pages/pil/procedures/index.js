const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    // const values = req.session.form[req.model.id].values.procedures;

    return next();

    // const opts = {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(values)
    // };

    // return req.api(`/pil/procedures`, opts)
    //   .then(() => {
    //     delete req.session.form[req.model.id];
    //     return next();
    //   })
    //   .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/procedures/, ''));
  });

  return app;
};
