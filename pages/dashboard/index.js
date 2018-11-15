const page = require('../../lib/page');
const moment = require('moment');
const datatable = require('../common/routers/datatable');
const schema = require('./schema');
const { dateFormat } = require('../../constants');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  const buildTask = (taskCase, req) => {
    const licence = taskCase.data.model;
    let action = {};

    switch (licence) {
      case 'pil':
        action = {
          label: 'PIL application',
          url: req.buildRoute('pil.update', {
            establishmentId: taskCase.data.establishment.id,
            profileId: taskCase.data.subject.id,
            pilId: taskCase.data.id
          }),
          details: taskCase.data.subject.name
        };
        break;
    }

    return {
      updatedAt: moment(taskCase.updatedAt).format(dateFormat.medium),
      establishments: [ taskCase.data.establishment ],
      establishment: taskCase.data.establishment.name,
      licence: licence.toUpperCase(),
      action
    };
  };

  app.get('/', (req, res, next) => {
    res.locals.static.profile = req.user.profile;
    next();
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/me/tasks`;
      next();
    },
    getValues: (req, res, next) => {
      req.datatable.data.rows = req.datatable.data.rows.map(taskCase => {
        return buildTask(taskCase, req);
      });
      next();
    }
  })({ schema }));

  return app;
};
