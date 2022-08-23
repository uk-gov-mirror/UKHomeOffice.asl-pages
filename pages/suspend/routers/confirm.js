const { Router } = require('express');
const { get, merge } = require('lodash');
const form = require('../../common/routers/form');
const content = require('../content/confirm');

module.exports = ({ modelType, action }) => {
  const app = Router();

  app.use(form({
    locals(req, res, next) {
      res.locals.static.profile = req.profile;
      res.locals.model = get(req.session, `form.${req.model.id}.values`);
      res.locals.static.content = merge({}, res.locals.static.content, content[action]);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const comment = get(req.session, `form.${req.model.id}.values.comment`);

    const params = {
      method: 'PUT',
      json: {
        meta: {
          comment
        }
      }
    };

    const endpoints = {
      pil: `/profile/${req.profileId}/pil/${req.model.id}/${action}`,
      project: `/establishment/${req.establishmentId}/projects/${req.model.id}/${action}`,
      establishment: `/establishment/${req.model.id}/${action}`
    };

    req.api(endpoints[modelType], params)
      .then(response => {
        const taskId = get(response, 'json.data.id');
        req.session.success = { taskId };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute(`${modelType}.${action}`, { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
