const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schemaGenerator = require('../schema');
const confirm = require('./routers/confirm');
const { cleanModel } = require('../../../lib/utils');
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

  app.use('/', (req, res, next) => {
    if (req.task.data.data.profileId && req.task.data.data.establishmentId) {
      return req.api(`/establishment/${req.task.data.data.establishmentId}/profile/${req.task.data.data.profileId}`)
        .then(({ json: { data } }) => {
          req.profile = cleanModel(data);
        })
        .then(() => next())
        .catch(next);
    }
    next();
  });

  app.use('/', form(Object.assign({
    configure: (req, res, next) => {
      req.schema = schemaGenerator(req.task);

      const key = req.task.data.model;
      // Copy the _content[key]_ properties one up as they are currently in **pil{}** and we want them
      // in **content{}**, as they will be looked up at content level in _asl-components(fieldset)_. The
      // idea is when we have a task of another type - not just pil application - we can just drop in a file
      // with the task's content - e.g. _content/ppl.js_ and require it in _content/index.js_ .
      Object.assign(res.locals.static.content, res.locals.static.content[key]);

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
