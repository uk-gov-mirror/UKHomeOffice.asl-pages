const page = require('../../lib/page');
const moment = require('moment');
const { readableDateFormat } = require('../../constants');

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
            profileId: taskCase.data.profile.id,
            pilId: taskCase.data.id
          }),
          details: taskCase.data.profile.name
        };
        break;
    }

    return {
      receivedAt: moment(taskCase.updated_at).format(readableDateFormat),
      establishment: taskCase.data.establishment,
      licence: licence.toUpperCase(),
      action
    };
  };

  app.get('/', (req, res, next) => {
    res.locals.static.profile = req.user.profile;

    return req.api(`/me/tasks`)
      .then(({ json: { data } }) => {
        const cases = data.json.data || [];
        res.locals.static.tasks = cases.map(taskCase => buildTask(taskCase, req));
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
