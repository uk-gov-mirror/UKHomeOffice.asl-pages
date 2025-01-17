const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form, relatedTasks } = require('../../common/routers');
const { hydrate } = require('../../common/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', hydrate());

  app.get('/', (req, res, next) => {
    if (['pending', 'inactive'].includes(req.model.status)) {
      return res.redirect(req.buildRoute('pil.update', { pilId: req.pil.id }));
    }
    next();
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('pil.read');
    if (req.pil.reviewDue && req.pil.status === 'active') {
      res.locals.static.pilReviewRequired = true;
      res.locals.static.reviewUrl = req.buildRoute('pil.review', { pilId: req.pil.id });
    }

    next();
  });

  app.get('/', (req, res, next) => {
    const params = {
      pilId: req.pil.id,
      profileId: req.profileId,
      establishment: req.establishmentId
    };
    Promise.all([
      req.user.can('pil.create', params),
      req.user.can('pil.update', params),
      req.user.can('pil.pdf', params)
    ])
      .then(([canApply, canUpdate, canDownload]) => {
        res.locals.static.canApply = !req.pil.id && canApply;
        res.locals.static.canUpdate = canUpdate;
        res.locals.static.canDownload = canDownload;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    if (req.model.status === 'revoked' && res.locals.static.canUpdate) {
      // users can't reactivate a PIL if they're no longer at the establishment that holds it
      res.locals.static.canReapply = !!req.profile.establishments.find(e => e.id === req.model.establishmentId);
    }
    res.locals.static.pil = req.model;
    res.locals.static.profile = req.profile;
    res.locals.static.currentPath = req.originalUrl;
    res.locals.static.isLicenceHolder = req.user.profile.id === req.profileId;
    next();
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'pil',
      modelId: req.pil.id,
      establishmentId: req.establishmentId
    };
  }));

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
    req.api(`/profile/${req.profileId}/pil/${req.pil.id}/conditions`, params)
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

  // redirect old /pil/:pilId links
  app.get('/:pilId', (req, res, next) => {
    if (req.params.pilId === 'create') {
      return next('route');
    }
    res.redirect(req.buildRoute('pil.read'));
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
