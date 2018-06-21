const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  return app;
};
