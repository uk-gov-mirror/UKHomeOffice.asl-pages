const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  return app;
};
