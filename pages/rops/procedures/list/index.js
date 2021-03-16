const { page } = require('@asl/service/ui');
const { pickBy, some } = require('lodash');
const { datatable } = require('../../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(datatable({
    configure: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedures`;
      // req.datatable.sort = { column: 'reviewDate', ascending: true };
      next();
    },
    locals: (req, res, next) => {
      // remove empty columns
      res.locals.datatable.schema = pickBy(schema, (field, key) => {
        return some(req.datatable.data.rows, row => {
          return row[key] !== null;
        });
      });
      next();
    }
  })({ schema, defaultRowCount: 100 }));

  return app;
};
