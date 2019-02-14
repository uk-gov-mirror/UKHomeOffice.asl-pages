const { omit } = require('lodash');
const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    if (req.pil.status !== 'active') {
      return res.redirect(req.buildRoute('pil.update'));
    }
    next();
  });

  app.get('/', (req, res, next) => {
    res.locals.model = req.pil;
    res.locals.static.schema = {
      licenceNumber: {},
      status: {},
      issueDate: {},
      revocationDate: {},
      conditions: {},
      procedures: {}
    };

    if (!req.pil.revocationDate) {
      res.locals.static.schema = omit(res.locals.static.schema, 'revocationDate');
    }

    res.locals.static.profile = req.profile;
    next();
  });

  return app;
};
