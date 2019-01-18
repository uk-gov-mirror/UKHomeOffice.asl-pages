const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');
const { cleanModel } = require('../../../lib/utils');
const success = require('./routers/success');
const getContent = require('./content');
const { merge } = require('lodash');
const UnauthorisedError = require('@asl/service/errors/unauthorised');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.breadcrumb('task.base');
    req.model = { id: `${req.task.id}-decision` };
    next();
  });

  app.use('/', (req, res, next) => {
    if (req.task.data.data.profileId && req.task.data.data.establishmentId) {
      return req.api(`/establishment/${req.task.data.data.establishmentId}/profile/${req.task.data.data.profileId}`)
        .then(({ json: { data } }) => {
          req.profile = cleanModel(data);
        })
        .then(() => next())
        .catch(error => {
          return Promise.resolve()
            .then(() => req.user.can('profile.read.all', { establishment: req.task.data.data.establishmentId }))
            .then(canReadAllProfiles => {
              if (!canReadAllProfiles) {
                const content = getContent(req.task);
                next(new UnauthorisedError(content.errors.permissions));
              } else {
                next(error);
              }
            });
        });
    }
    next();
  });

  app.use('/', form(Object.assign({
    configure: (req, res, next) => {
      merge(res.locals.static.content, getContent(req.task));
      req.schema = schemaGenerator(req.task);
      req.form.schema = req.schema;

      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = req.schema;
      res.locals.static.task = req.task;
      res.locals.static.profile = req.profile;
      next();
    }
  })));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.confirm', { taskId: req.task.id }));
  });

  app.use('/confirm', confirm());
  app.use('/success', success());

  return app;
};
