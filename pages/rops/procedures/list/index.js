const { page } = require('@asl/service/ui');
const { pickBy, pick, some } = require('lodash');
const { datatable } = require('../../../common/routers');
const getSchema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

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

  app.use(datatable({
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

      req.datatable.data.rows = req.datatable.data.rows.map((row, idx) => ({ rowNum: idx + 1, ...row }));
      next();
    }
  })());

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
