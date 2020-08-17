const { page } = require('@asl/service/ui');

module.exports = () => {
  const app = page({ root: __dirname });

  return app;
};
