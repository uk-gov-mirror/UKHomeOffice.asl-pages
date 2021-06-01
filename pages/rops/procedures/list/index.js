const { page } = require('@asl/service/ui');
const { pickBy, some } = require('lodash');
const { datatable } = require('../../../common/routers');
const getSchema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(datatable({
    configure: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedures`;
      req.datatable.schema = getSchema(req.rop);
      next();
    },
    locals: (req, res, next) => {
      // remove empty columns
      res.locals.datatable.schema = pickBy(req.datatable.schema, (field, key) => {
        return some(req.datatable.data.rows, row => {
          return row[key] !== null;
        });
      });
      next();
    }
  })({ defaultRowCount: 100 }));

  return app;
};
