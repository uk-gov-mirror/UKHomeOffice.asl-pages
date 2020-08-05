const { set } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = settings => {
  const app = page({ root: __dirname });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { update } = req.form.values;

    if (!update) {
      return res.redirect(req.buildRoute('pil.update'));
    }
    const type = req.pil.status === 'active' ? 'amendment' : 'application';
    set(req.session, 'training-referrer', {
      target: req.originalUrl,
      label: `PIL ${type}`
    });
    res.redirect(req.buildRoute('training.dashboard'));
  });

  return app;
};
