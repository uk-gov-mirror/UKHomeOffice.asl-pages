const { page } = require('@asl/service/ui');
const update = require('./routers/update');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = req.pil;
    next();
  });

  app.use('/', update());
  app.use('/confirm', confirm());
  app.use('/success', success({
    licence: 'pil',
    getStatus: req => req.user.profile.asruUser ? 'resolved' : 'resubmitted',
    type: 'revocation'
  }));

  return app;
};
