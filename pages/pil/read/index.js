const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { hydrate } = require('../../common/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', hydrate());

  app.get('/', (req, res, next) => {
    if (['pending', 'inactive'].includes(req.model.status)) {
      return res.redirect(req.buildRoute('pil.update'));
    }
    next();
  });

  app.use((req, res, next) => {
    const params = {
      pilId: req.pilId
    };
    Promise.all([
      req.user.can('pil.update', params),
      req.user.can('pil.pdf', params)
    ])
      .then(([canUpdate, canDownload]) => {
        res.locals.static.canUpdate = canUpdate;
        res.locals.static.canDownload = canDownload;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.locals.static.pil = req.model;
    res.locals.static.openTask = req.model.openTasks[0];
    res.locals.static.profile = req.profile;
    res.locals.static.correctEstablishment = req.model.establishmentId === req.establishment.id;
    res.locals.static.currentPath = req.originalUrl;
    res.locals.static.isLicenceHolder = req.user.profile.id === req.profileId;
    next();
  });

  app.use(form({
    schema: {
      conditions: {
        inputType: 'textarea'
      }
    }
  }));

  app.post('/', (req, res, next) => {
    const conditions = get(req.form, 'values.conditions');
    const params = {
      method: 'PUT',
      json: {
        data: { conditions }
      }
    };
    req.api(`/profile/${req.profileId}/pil/${req.pilId}/conditions`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    req.notification({
      key: req.user.profile.asruLicensing ? 'conditions-updated' : 'update-requested'
    });
    delete req.session.form[id];
    res.redirect(req.buildRoute('pil.read'));
  });

  return app;
};
