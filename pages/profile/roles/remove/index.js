const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const schema = require('./schema');
const confirm = require('../routers/confirm');
const success = require('../routers/success');

const sendData = (req) => {
  const { type, comment } = req.session.form[req.model.id].values;
  const roleId = req.profile.roles.find(r => r.type === type).id;

  const opts = {
    method: 'DELETE',
    json: {
      data: { profileId: req.profileId },
      meta: { comment }
    }
  };

  return req.api(`/establishment/${req.establishmentId}/role/${roleId}`, opts);
};

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', (req, res, next) => {
    req.breadcrumb('role.delete');
    next();
  });

  app.use('/', form({
    configure: (req, res, next) => {
      req.form.schema = {
        ...schema(req.profile.roles, 'remove')
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = req.form.schema;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.buildRoute('role.delete')}/confirm`);
  });

  app.use('/confirm', confirm({
    action: 'delete',
    sendData
  }));

  app.post('/confirm', (req, res, next) => {
    sendData(req)
      .then(() => res.redirect(`${req.buildRoute(`role.delete`)}/success`))
      .catch(next);
  });

  app.use('/success', success());

  return app;
};
