const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const success = require('../../success');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('rops.submit', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm());

  app.use('/success', success());

  app.get('*', (req, res) => res.sendResponse());

  return app;
};
