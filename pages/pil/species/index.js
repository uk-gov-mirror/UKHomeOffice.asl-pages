const { get, set, merge, pick } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');
const { buildModel } = require('../../../lib/utils');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = merge({ id: `${req.pilId}-species` },
      buildModel(schema),
      pick(req.model, 'species')
    );
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const species = get(req.session, `form[${req.model.id}].values`);
    const savedValues = get(req.session, `form[${req.pil.id}].values`);
    set(req.session, `form[${req.pil.id}].values`, Object.assign({}, savedValues, species));
    delete req.session.form[req.model.id].validationErrors;
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
