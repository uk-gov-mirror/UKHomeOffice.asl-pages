const { omit } = require('lodash');
const { page } = require('@asl/service/ui');

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
    req.breadcrumb('pil.base');

    res.locals.model = req.pil;

    res.locals.static.schema = {
      licenceNumber: {},
      status: {},
      issueDate: {},
      revocationDate: {},
      species: {},
      procedures: {},
      notesCatD: {
        show: false
      },
      notesCatF: {
        show: false
      },
      conditions: {}
    };

    if (!req.pil.revocationDate) {
      res.locals.static.schema = omit(res.locals.static.schema, 'revocationDate');
    }

    res.locals.static.profile = req.profile;
    next();
  });

  return app;
};
