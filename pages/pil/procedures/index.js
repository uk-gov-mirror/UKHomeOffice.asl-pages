const { get, set, pick, merge } = require('lodash');
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
    req.model = merge({ id: `${req.pilId}-procedures` },
      pick(req.model, 'procedures', 'notesCatD', 'notesCatF'),
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
    const procedures = get(req.session, `form[${req.model.id}].values`);
    const savedValues = get(req.session, `form[${req.pil.id}].values`);
    set(req.session, `form[${req.pil.id}].values`, Object.assign({}, savedValues, procedures));
    delete req.session.form[req.model.id].validationErrors;
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
