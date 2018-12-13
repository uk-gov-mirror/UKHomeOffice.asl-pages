const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');
const success = require('./routers/success');

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

  app.use('/', form(Object.assign({
    configure: (req, res, next) => {
      req.schema = schemaGenerator(req.task);

      // create error messages for the dynamic textareas
      Object.assign(
        res.locals.static.content.errors,
        {
          ...req.task.nextSteps.reduce((obj, step) => {
            return {
              ...obj,
              [`${step.id}-reason`]: {
                customValidate: res.locals.static.content.errors.reason.customValidate
              }
            };
          }, {})
        }
      );

      // create field labels for the dynamic textareas
      Object.assign(
        res.locals.static.content.fields,
        {
          ...req.task.nextSteps.reduce((obj, step) => {
            return {
              ...obj,
              [`${step.id}-reason`]: {
                label: res.locals.static.content.fields.reason.label
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
