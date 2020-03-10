const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const revoke = require('./routers/revoke');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.project.id}-revoke`
    };
    next();
  });

  app.use('/', revoke());

  app.use('/confirm', confirm());

  app.use('/success', success({
    licence: 'project',
    getStatus: req => {
      return req.user.profile.asruUser
        ? req.user.profile.asruLicensing ? 'resolved' : 'inspector-recommended'
        : 'resubmitted';
    },
    type: 'revocation'
  }));

  return app;
};
