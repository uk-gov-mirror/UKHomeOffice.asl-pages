const { merge } = require('lodash');
const { page } = require('@asl/service/ui');
const { NotFoundError } = require('@asl/service/errors');
const datatable = require('../../common/routers/datatable');
const content = require('./content');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.datatable = {
      sort: {
        column: 'updatedAt',
        ascending: false
      }
    };
    next();
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/invitations`;
      next();
    }
  })({ schema }));

  app.post('/:invitationId/:action', (req, res, next) => {
    const allowedActions = ['delete', 'resend', 'cancel'];

    if (!allowedActions.includes(req.params.action)) {
      return next(new NotFoundError());
    }

    const { invitationId, action } = req.params;
    const isDeletion = action === 'delete';
    const params = {
      method: isDeletion ? 'DELETE' : 'PUT'
    };
    const suffix = isDeletion ? '' : `/${action}`;
    res.locals.static.content = merge({}, res.locals.static.content, content);
    req.api(`/establishment/${req.establishmentId}/invitations/${invitationId}${suffix}`, params)
      .then(() => req.notification({ key: action }))
      .then(() => next())
      .catch(next);
  });

  app.post('/:invitationId/:action', (req, res) => res.redirect(req.buildRoute('profile.invitations')));

  return app;
};
