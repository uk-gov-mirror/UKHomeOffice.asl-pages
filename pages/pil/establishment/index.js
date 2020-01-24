const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const getSchema = require('./schema');
const { canTransferPil } = require('../../../lib/utils');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.model.id = `${req.pil.id}-establishment`;
    next();
  });

  app.use((req, res, next) => {
    return canTransferPil(req)
      .then(canTransfer => {
        if (!canTransfer) {
          return next(new Error('Only the PIL holder and ASRU can transfer this PIL'));
        }
      })
      .then(() => next());
  });

  app.use(form({
    configure: (req, res, next) => {
      req.form.schema = getSchema(req.profile.establishments, req.pil);
      next();
    },
    cancelEdit: (req, res, next) => {
      req.session.form[req.pil.id].values.establishmentId = req.pil.establishmentId;
      return res.redirect(req.buildRoute('pil.update'));
    }
  }));

  app.post('/', (req, res, next) => {
    const establishmentId = get(req.session, `form[${req.model.id}].values.establishment`);
    req.session.form[req.pil.id].values.establishmentId = parseInt(establishmentId, 10);
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
