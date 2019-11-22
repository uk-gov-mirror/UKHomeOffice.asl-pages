const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  return app;
};
