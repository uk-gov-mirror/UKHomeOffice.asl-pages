const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');
const { cleanModel } = require('../../../lib/utils');
const success = require('./routers/success');
const getContent = require('./content');
const { merge, get } = require('lodash');
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
      const content = merge(res.locals.static.content, getContent(req.task));
      req.schema = schemaGenerator(req.task);

      // create error messages for the dynamic textareas
      Object.assign({},
        res.locals.static.content.errors,
        {
          ...req.task.nextSteps.reduce((obj, step) => {
            if (!step.commentRequired) {
              return obj;
            }
            return {
              ...obj,
              [`${step.id}-reason`]: {
                customValidate: get(content, 'errors.reason.customValidate')
              }
            };
          }, {})
        }
      );
      // create field labels for the dynamic textareas
      Object.assign({},
        res.locals.static.content.fields,
        {
          ...req.task.nextSteps.reduce((obj, step) => {
            if (!step.commentRequired) {
              return obj;
            }
            return {
              ...obj,
              [`${step.id}-reason`]: {
                label: get(content, 'fields.reason.label')
              }
            };
          }, {})
        }
      );

      // copy the reason fields to the top level for validation / saving
      req.form.schema = {
        ...req.schema,
        ...req.schema.decision.options.reduce((obj, option) => {
          if (!option.reveal || !option.reveal[`${option.value}-reason`]) {
            return obj;
          }

          return {
            ...obj,
            [`${option.value}-reason`]: option.reveal[`${option.value}-reason`]
          };
        }, {})
      };

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
