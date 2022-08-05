const { page } = require('@asl/service/ui');
const { enforcementFlags, populateNamedPeople } = require('../../common/middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', populateNamedPeople);

  app.get('/', (req, res, next) => {
    res.enforcementModel = req.establishment;
    next();
  }, enforcementFlags);

  return app;
};
