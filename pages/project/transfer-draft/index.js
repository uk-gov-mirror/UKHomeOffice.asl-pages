const { page } = require('@asl/service/ui');
const { NotFoundError } = require('@asl/service/errors');
const confirm = require('./routers/confirm');
const form = require('../../common/routers/form');
const getSchema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm']
  });

  app.use((req, res, next) => {
    // prevent non-drafts or submitted drafts from using this route
    if (req.project.status !== 'inactive' || req.project.openTasks.length > 0) {
      return next(new NotFoundError());
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.projectId}-transfer-draft`,
      primaryEstablishment: req.establishment.id.toString()
    };
    res.locals.static.project = req.project;
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = getSchema(req.user.profile.establishments);
      next();
    },
    cancelEdit: (req, res, next) => {
      delete req.session.form[req.model.id];
      return res.redirect(req.buildRoute('project.read'));
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('project.transferDraft', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm());

  return app;
};
