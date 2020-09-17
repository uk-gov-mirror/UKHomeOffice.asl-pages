const { page } = require('@asl/service/ui');
const { datatable } = require('../../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    res.locals.pageTitle = `${res.locals.static.content.title} - ${req.establishment.name}`;
    next();
  });

  app.use(datatable({
    configure: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/pils`;
      req.datatable.sort = { column: 'reviewDate', ascending: true };
      next();
    }
  })({ schema }));

  return app;
};
