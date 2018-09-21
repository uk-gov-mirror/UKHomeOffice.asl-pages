const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { omit } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }), (req, res, next) => {
    res.locals.static.exempt = req.query.exempt;
    next();
  });

  app.post('/', (req, res, next) => {
    const values = omit(req.session.form[req.model.id].values, 'exempt');
    values.profileId = req.user.profile.id;
    if (res.locals.static.exempt) {
      values.exemption = true;
    }

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/pil/training`, opts)
      .then(() => {
        return res.redirect(req.originalUrl.replace(/\/modules/, '').replace(/\/\?exempt=true/, ''));
      })
      .catch(next);
  });

  return app;
};
