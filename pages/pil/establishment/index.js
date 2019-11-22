const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const getSchema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('pil.establishment');
    req.model.id = `${req.pil.id}-establishment`;
    next();
  });

  app.use((req, res, next) => {
    // edit establishment link is only shown on user's own PIL, but just in case
    if (req.user.profile.id !== req.profile.id) {
      throw new Error('You can only transfer your own PIL');
    }
    next();
  });

  app.use(form({
    configure: (req, res, next) => {
      req.form.schema = getSchema(req.user.profile.establishments, req.pil);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const establishmentId = get(req.session, `form[${req.model.id}].values.establishment`);
    req.session.form[req.pil.id].values.establishmentId = parseInt(establishmentId, 10);
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
