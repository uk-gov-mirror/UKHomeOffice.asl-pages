const { page } = require('@asl/service/ui');
const { pick, merge } = require('lodash');
const config = require('./config');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    const { step } = req.params;
    req.config = config[step];
    res.locals.static.step = step;
    merge(
      res.locals.static.content,
      res.locals.static.content.sections[req.config.section] || {},
      res.locals.static.content.steps[step] || {}
    );
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = pick(schema(req), req.config.fields);
      next();
    },
    locals: (req, res, next) => {
      if (req.config.locals) {
        merge(res.locals.static, req.config.locals(req));
      }
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const params = {
      method: 'PUT',
      json: {
        data: req.form.values
      }
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}`, params)
      .then(() => {
        delete req.session.form[req.model.id].values;
        next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    res.redirect(req.config.target(req));
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
