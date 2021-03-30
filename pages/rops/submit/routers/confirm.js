const { Router } = require('express');
const { get } = require('lodash');
const { form } = require('../../../common/routers');
const schema = require('../schema/confirm');
const content = require('../content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const params = {
      method: 'POST',
      json: {
        meta: {
          comment: values.comment,
          declaration: content.declaration
        }
      }
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/submit`, params)
      .then(response => {
        const task = get(response, 'json.data');
        req.session.success = { taskId: task.id };
        res.redirect(req.buildRoute('rops.submit', { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
