const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { isExemption } = req.form.values;
    const target = isExemption
      ? 'modules'
      : 'certificate';
    res.redirect(req.buildRoute(`training.${target}`));
  });

  return app;
};
