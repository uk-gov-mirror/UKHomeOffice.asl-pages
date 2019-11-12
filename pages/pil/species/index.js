const { merge, pick } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');
const { buildModel } = require('../../../lib/utils');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    req.breadcrumb('pil.species');

    req.model = merge({ id: req.pilId },
      pick(req.pil, 'species'),
      buildModel(schema)
    );
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
