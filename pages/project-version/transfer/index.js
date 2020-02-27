const { pick } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { NotFoundError } = require('@asl/service/errors');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    // feature switch
    if (process.env.ENABLE_PPL_TRANSFER) {
      return next();
    }
    next(new NotFoundError());
  });

  app.use('/', (req, res, next) => {
    req.user.can('project.transfer', req.params)
      .then(can => can ? next() : next(new NotFoundError()))
      .catch(next);
  });

  app.use((req, res, next) => {
    req.model = req.version;
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = schema(req.user.profile.establishments)
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const establishmentId = parseInt(req.form.values.establishment, 10);
    const params = {
      method: 'POST',
      json: {
        data: {
          establishmentId,
        },
        meta: {
          version: req.versionId
        }
      }
    }
    req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/transfer`, params)
      .then(() => next())
      .catch(next)
  });

  app.post('/', (req, res, next) => {
    delete req.session.form[req.model.id];
    res.redirect('/')
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
}
