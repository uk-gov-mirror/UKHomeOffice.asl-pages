const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishmentId);
    res.locals.static.establishment = establishment;
    next();
  });

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };
    return req.api(`/establishment/${req.establishmentId}/invite-user`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    req.notification({
      key: 'success',
      email: req.session.form[id].values.email
    });
    delete req.session.form[id];
    return res.redirect(`${req.buildRoute('profile.list')}/invitations`);
  });

  return app;
};
