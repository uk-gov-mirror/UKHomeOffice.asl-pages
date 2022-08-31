const { set, get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { buildModel } = require('../../../lib/utils');
const schema = require('./schema');

module.exports = settings => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.pilId}-training`,
      ...buildModel(schema)
    };
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { update } = req.form.values;

    if (!update) {
      const training = get(req.session, `form[${req.model.id}].values`);
      const savedValues = get(req.session, `form[${req.pil.id}].values`);
      set(req.session, `form[${req.pil.id}].values`, Object.assign({}, savedValues, { training: training }));
      return res.redirect(req.buildRoute('pil.update'));
    }
    const type = req.pil.status === 'active' ? 'amendment' : 'application';
    set(req.session, 'training-referrer', {
      target: req.originalUrl,
      label: `Resume ${req.profile.firstName} ${req.profile.lastName}'s personal licence ${type}`
    });
    res.redirect(req.buildRoute('training.dashboard'));
  });

  return app;
};
