const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const { form, relatedTasks } = require('../../common/routers');
const { enforcementFlags } = require('../../common/middleware');
const schema = require('./schema');

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

  app.get('/', (req, res, next) => {
    res.enforcementModel = req.establishment;
    next();
  }, enforcementFlags);

  app.get('/', relatedTasks(req => {
    return {
      model: 'establishment',
      modelId: req.model.id
    };
  }));

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

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
