const { pick, merge } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { buildModel } = require('../../../lib/utils');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('pil.procedures');

    req.model = merge({ id: req.pilId },
      pick(req.pil, 'procedures', 'notesCatD', 'notesCatF'),
      buildModel(schema)
    );
    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      notesCatD: {},
      notesCatF: {}
    },
    locals: (req, res, next) => {
      res.locals.static.schema = schema;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
