const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const { buildModel } = require('../../../../lib/utils');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.profile.id}-new-role-named-person`,
      ...buildModel(schema)
    };
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = schema(req.profile);
      next();
    },
    locals: (req, res, next) => {
      Object.assign(res.locals, { model: req.model });
      Object.assign(res.locals.static, {
        profile: req.profile,
        role: {
          ...req.session.form[req.model.id].values
        }
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values = req.form.values;
      next();
    }
  }));

  // eslint-disable-next-line no-warning-comments
  //TODO: redirects is not part of current ticket
  app.post('/', (req, res, next) => {
    const { values } = req.form;
    if (values) {
      return res.redirect(req.buildRoute('role.namedPersonMvp.create'));
    } else {
      return res.redirect(req.buildRoute('training.dashboard'));
    }
  });

  return app;
};
