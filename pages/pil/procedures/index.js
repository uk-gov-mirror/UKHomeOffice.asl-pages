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
    req.model = merge({},
      pick(req.pil, 'procedures', 'notesCatD', 'notesCatF'),
      buildModel(schema)
    );
    req.model.id = `${req.pilId}-procedures`;
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

    const opts = {
      method: 'PUT',
      json: {
        data: pick(req.form.values, 'procedures', 'notesCatD', 'notesCatF')
      }
    };

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
