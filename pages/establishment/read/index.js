const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const { form } = require('../../common/routers');
const schema = require('./schema');
const relatedTasks = require('../../common/middleware/related-tasks');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.establishment;
    res.locals.static.currentPath = req.originalUrl;
    next();
  });

  app.use(form({ schema }));

  app.get('/', (req, res, next) => relatedTasks({
    model: 'establishment',
    modelId: req.model.id
  })(req, res, next));

  app.post('/', (req, res, next) => {
    const conditions = get(req.form, 'values.conditions');
    const params = {
      method: 'PUT',
      json: {
        data: { conditions }
      }
    };
    req.api(`/establishment/${req.establishmentId}/conditions`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.establishment.id;
    req.notification({
      key: req.user.profile.asruLicensing ? 'conditions-updated' : 'update-requested'
    });
    delete req.session.form[id];
    res.redirect(req.buildRoute('establishment.read'));
  });

  return app;
};
