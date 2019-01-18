const { page } = require('@asl/service/ui');
const apply = require('./apply');
const remove = require('./remove');
const confirm = require('./routers/confirm');
const success = require('./routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', apply());
  app.use('/remove', remove());
  app.use('/confirm', confirm());
  app.use('/success', success({ model: 'role' }));

  return app;
};
