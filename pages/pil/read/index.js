const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    if (['pending', 'inactive'].includes(req.pil.status)) {
      return res.redirect(req.buildRoute('pil.update'));
    }
    next();
  });

  app.use((req, res, next) => {
    const params = {
      id: req.pilId,
      profileId: req.pil.profileId,
      establishment: req.establishment.id
    };
    req.user.can('pil.update', params)
      .then(can => {
        res.locals.static.canUpdate = can;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('pil.read');
    res.locals.static.pil = req.pil;
    res.locals.static.openTask = req.pil.tasks[0];
    res.locals.static.profile = req.profile;
    next();
  });

  app.use((req, res, next) => {
    req.model = req.pil;
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
    console.log(req.session);
    const id = req.pil.id;
    req.notification({
      key: req.user.profile.asruLicensing ? 'conditions-updated' : 'update-requested'
    });
    delete req.session.form[id];
    res.redirect(req.buildRoute('pil.read'));
  });

  return app;
};
