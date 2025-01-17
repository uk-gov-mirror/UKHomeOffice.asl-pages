const { page } = require('@asl/service/ui');
const routes = require('./routes');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/deadline-passed', '/extend', '/confirm', '/success']
  });

  return app;
};

module.exports.routes = routes;
