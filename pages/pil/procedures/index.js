const { pick } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({
    schema: {
      ...schema,
      notesCatD: {},
      notesCatF: {}
    },
    locals: (req, res, next) => {
      res.locals.static.schema = schema;
      next();
    }
  }));

  app.post('/', (req, res, next) => {

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(pick(req.form.values, 'procedures', 'notesCatD', 'notesCatF'))
    };

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.model.id}`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/procedures/, ''));
  });

  return app;
};
