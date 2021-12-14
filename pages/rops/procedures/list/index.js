const { page } = require('@asl/service/ui');
const { pickBy, pick, some } = require('lodash');
const { datatable } = require('../../../common/routers');
const getSchema = require('./schema');
const review = require('./routers/review');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/review']
  });

  app.use((req, res, next) => {
    const params = {
      projectId: req.projectId,
      licenceHolderId: req.project.licenceHolderId,
      establishment: req.establishment.id
    };
    req.user.can('project.rops.submit', params)
      .then(canSubmit => {
        res.locals.static.canSubmit = canSubmit;
      })
      .then(() => next())
      .catch(next);
  });

  const proceduresTable = datatable({
    configure: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedures`;
      req.datatable.schema = getSchema(req.rop);
      req.datatable.pagination = false;
      next();
    },
    locals: (req, res, next) => {
      if (req.datatable.data.rows.length > 0) {
        // remove empty columns whem we have data
        res.locals.datatable.schema = pickBy(req.datatable.schema, (field, key) => {
          return some(req.datatable.data.rows, row => {
            return row[key] !== null;
          });
        });
      } else {
        // show a limited set of columns when the table is empty
        res.locals.datatable.schema = pick(req.datatable.schema, ['rowNum', 'species', 'purposes', 'severity', 'severityNum']);
      }

      const noProceduresCompleted = req.rop.proceduresCompleted === false;
      const noPostnatal = req.rop.postnatal === false;

      if (noProceduresCompleted || noPostnatal) {
        res.locals.static.nilReturn = true;
      }

      req.datatable.data.rows = req.datatable.data.rows.map((row, idx) => ({ rowNum: idx + 1, ...row }));
      next();
    }
  });

  app.use('/', proceduresTable());

  app.use('/review', proceduresTable());
  app.use('/review', review());

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
