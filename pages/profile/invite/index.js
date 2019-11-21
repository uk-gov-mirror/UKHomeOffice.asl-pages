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
    return req.api(`/establishment/${req.establishmentId}`)
      .then(response => {
        res.locals.static.establishment = response.json.data;
        next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'POST',
      json: {
        data: values
      }
    };
    return req.api(`/establishment/${req.establishmentId}/invite-user`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    req.notification({
      key: 'invitation-sent',
      email: req.session.form[id].values.email
    });
    delete req.session.form[id];
    return res.redirect(req.buildRoute('profile.invitations'));
  });

  return app;
};
