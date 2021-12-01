const { Router } = require('express');
const { pick, merge, size } = require('lodash');
const validator = require('../../../lib/validation');
const form = require('./form');
const { getOptionReveals } = form;

module.exports = ({ schema, config, root, postData = (req, res, next) => next(), locals = (req, res, next) => next() }) => {

  function nextStep(req, res) {
    const step = req.step;
    const steps = Object.keys(config);
    const nextStep = steps[steps.indexOf(step) + 1];

    if (nextStep) {
      return res.redirect(req.buildRoute(root, { step: nextStep }));
    } else {
      throw new Error('Not found');
    }
  }

  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    const { step } = req.params;
    req.step = step;
    req.config = config[step];
    res.locals.static.step = step;
    merge(
      res.locals.static.content,
      res.locals.static.content.sections[req.config.section] || {},
      res.locals.static.content.steps[step] || {}
    );
    next();
  });

  app.get('/', (req, res, next) => {
    if (req.config.include && !req.config.include(req)) {
      return nextStep(req, res);
    }
    next();
  });

  app.use((req, res, next) => {
    const allSteps = Object.keys(config);

    const steps = allSteps.filter(s => {
      const include = config[s].include;
      return !include || include(req);
    });

    const redirectTo = steps.reduce((redirect, key) => {
      if (redirect) {
        return redirect;
      }
      const fields = config[key].fields;
      if (!fields) {
        return null;
      }
      const fieldSchema = pick(schema(req), fields);
      const reveals = getOptionReveals(fieldSchema, req.model);

      const validation = validator(req.model, { ...fieldSchema, ...reveals }, req.model);

      if (size(validation)) {
        return key;
      }
      return null;
    }, null);

    req.redirectTo = redirectTo;
    res.locals.static.redirectTo = redirectTo;
    next();
  });

  app.use(locals);

  app.use(form({
    configure(req, res, next) {
      req.multiStep = {};
      req.form.schema = pick(schema(req), req.config.fields);
      next();
    },
    locals: (req, res, next) => {
      if (req.config.locals) {
        merge(res.locals.static, req.config.locals(req));
      }
      next();
    },
    process: (req, res, next) => {
      req.multiStep.values = req.form.values;
      if (req.config.process) {
        req.config.process(req);
      }
      next();
    }
  }));

  app.post('/', postData);

  app.post('/', (req, res, next) => {
    const getTarget = req.config.target;
    if (getTarget) {
      const target = getTarget(req);
      if (target) {
        return res.redirect(target);
      }
    }
    next();
  });

  app.post('/', nextStep);

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
