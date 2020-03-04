const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { NotFoundError } = require('@asl/service/errors');
const { diff } = require('deep-diff');
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

  app.use((req, res, next) => {
    req.model = req.version;
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = schema(req.user.profile.establishments);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const establishmentId = parseInt(req.form.values.establishment, 10);
    const patch = diff(req.version.data, {
      ...req.version.data,
      transferToEstablishment: establishmentId
    });
    const opts = {
      method: 'PUT',
      json: {
        data: {
          patch
        }
      }
    };
    return Promise.resolve()
      .then(() => req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/project-versions/${req.version.id}/patch`, opts))
      .then(() => {
        const params = {
          method: 'POST',
          json: {
            data: {
              establishmentId
            },
            meta: {
              version: req.versionId
            }
          }
        };
        return req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/transfer`, params)
          .then(() => next());
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    delete req.session.form[req.model.id];
    res.redirect('/');
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
