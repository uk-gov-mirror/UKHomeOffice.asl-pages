const { page } = require('@asl/service/ui');
const { datatable } = require('../../../../common/routers');
const schema = require('../participants/list/schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    res.locals.pageTitle = `${req.trainingCourse.title} - ${req.establishment.name}`;
    next();
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      const query = {
        model: 'trainingCourse',
        modelId: req.trainingCourseId,
        establishmentId: req.establishmentId,
        action: 'grant'
      };
      req.datatable.apiPath = ['/tasks/related', { query }];
      next();
    }
  })({ schema, defaultRowCount: 10 }));

  return app;
};
