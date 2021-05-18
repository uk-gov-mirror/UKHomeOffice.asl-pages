const { page } = require('@asl/service/ui');
const { omit } = require('lodash');
const { relatedTasks } = require('../../common/routers');
const { baseSchema } = require('../schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    req.model.nacwos = req.place.roles.filter(r => r.type === 'nacwo');
    req.model.nvssqps = req.place.roles.filter(r => ['nvs', 'sqp'].includes(r.type));
    res.locals.model = req.model;
    res.locals.static.openTask = req.model.openTasks[0];

    const schema = baseSchema();

    res.locals.static.summarySchema = {
      ...omit(schema, 'name'),
      restrictions: {
        ...schema.restrictions,
        showDiff: true
      }
    };

    return req.user.can('place.update', { establishment: req.establishmentId })
      .then(canUpdate => {
        res.locals.static.canUpdate = canUpdate;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'place',
      modelId: req.placeId,
      establishmentId: req.establishmentId
    };
  }));

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
