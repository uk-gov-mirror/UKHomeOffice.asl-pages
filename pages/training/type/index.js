const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(form({
    schema,
    saveValues: (req, res, next) => {
      // remove possible certificate values from session when adding an exemption and vice versa
      req.session.form[req.model.id].values = req.form.values;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { isExemption } = req.form.values;
    const target = isExemption
      ? 'modules'
      : 'certificate';
    res.redirect(req.buildRoute(`${res.locals.static.basePage}.${target}`));
  });

  return app;
};
